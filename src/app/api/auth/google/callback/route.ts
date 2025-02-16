import { createStripeCustomer } from "@/shared/actions/stripe/createStripeCustomer";
import { getUserByEmail } from "@/shared/actions/entities/user/getUserByEmail";
import { updateUserById } from "@/shared/actions/entities/user/updateUserById";
import { googleOAuthClient } from "@/utils/security/googleOauth";
import { lucia } from "@/core/auth/lucia";
import { prisma } from "@/shared/core/db/prisma";
import { createAndSetSessionCookie } from "@/utils/security/cookies";
import { OAuthProvider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_REDIRECT_URL } from "@/config/constants/app";
/**
 * Google OAuth callback handler
 * Processes the OAuth response from Google, creates or updates user accounts,
 * and establishes an authenticated session
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    // Extract code and state from callback URL parameters
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    // Validate code and state parameters exist
    if (!code || !state) {
      console.error("api/auth/google/callback: no code or state");
      return new Response("Invalid request", { status: 400 });
    }

    // Get stored OAuth verifier and state from cookies
    const codeVerifier = request.cookies.get(
      "google_oAuth_code_verifier",
    )?.value;
    const savedState = request.cookies.get("google_oAuth_state")?.value;

    // Validate stored values exist
    if (!codeVerifier || !savedState) {
      console.error("api/auth/google/callback: no code verifier or state");
      return new Response("Invalid request", { status: 400 });
    }

    // Verify state matches to prevent CSRF attacks
    if (state !== savedState) {
      console.error("api/auth/google/callback: state mismatch");
      return new Response("Invalid request", { status: 400 });
    }

    // Clear OAuth cookies
    // TODO: confirm this is the correct way to delete cookies
    request.cookies.delete("google_oAuth_state");
    request.cookies.delete("google_oAuth_code_verifier");

    // Exchange authorization code for access token
    const tokens = await googleOAuthClient.validateAuthorizationCode(
      code,
      codeVerifier,
    );

    // Fetch user information from Google
    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleData = (await googleResponse.json()) as {
      id: string;
      email: string;
      name: string;
      picture: string;
    };

    let userId = ""; // Set later depending on if user exists or needs to be created
    const existingUser = await getUserByEmail(googleData.email);

    // If user already exists
    if (existingUser) {
      userId = existingUser.id;

      // Then check if they have a google token
      const existingGoogleToken = await prisma.googleToken.findFirst({
        where: { user: { id: userId } },
      });

      // If they do, update it
      if (existingGoogleToken) {
        await prisma.googleToken.update({
          where: { id: existingGoogleToken.id },
          data: {
            googleAccessToken: tokens.accessToken,
            googleRefreshToken: tokens.refreshToken,
            googleTokenExpiry: tokens.accessTokenExpiresAt,
          },
        });
      } else {
        // If they don't, create it
        await prisma.googleToken.create({
          data: {
            googleAccessToken: tokens.accessToken,
            googleRefreshToken: tokens.refreshToken,
            googleTokenExpiry: tokens.accessTokenExpiresAt,
            userId: userId,
          },
        });
      }
    }

    // If user doesn't exist, create new account with google token
    if (!existingUser) {
      // Create new user record
      const user = await prisma.user.create({
        data: {
          email: googleData.email.toLowerCase(),
          name: googleData.name,
          avatar: googleData.picture,
          isVerified: true, // Google accounts are pre-verified
          oAuthProvider: OAuthProvider.GOOGLE,
        },
      });
      userId = user.id;

      // Create google token for user
      await prisma.googleToken.create({
        data: {
          googleAccessToken: tokens.accessToken,
          googleRefreshToken: tokens.refreshToken,
          googleTokenExpiry: tokens.accessTokenExpiresAt,
          userId: userId,
        },
      });

      // Create associated Stripe customer
      const stripeCustomer = await createStripeCustomer(
        googleData.email.toLocaleLowerCase(),
        googleData.name,
      );

      // Update user with Stripe customer ID if created successfully
      if (stripeCustomer.id !== undefined) {
        await updateUserById(user.id, { stripeCustomerId: stripeCustomer.id });
      } else {
        console.error("Failed to create Stripe customer for user", user);
      }
    }

    // Create authenticated session
    const session = await lucia.createSession(userId, {});
    createAndSetSessionCookie(session.id);

    const response = NextResponse.redirect(
      new URL(DEFAULT_REDIRECT_URL, request.url),
    );
    return response;
  } catch (error: any) {
    console.error("api/auth/google/callback: error", error.message);
    return new Response("Internal server error", { status: 500 });
  } finally {
    // Redirect to default URL regardless of success/failure
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_URL, request.url));
  }
}
