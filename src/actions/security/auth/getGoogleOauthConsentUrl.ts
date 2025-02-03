"use server";

import { prisma } from "@/utils/lib/prisma";
import { googleOAuthClient } from "@/utils/security/googleOauth";
import { generateState } from "arctic";
import { generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    // // Store the user ID in a cookie so we can access it in the callback
    // cookies().set("google_oauth_user_id", userId, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    cookies().set("google_oAuth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("google_oAuth_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Clear any existing Google tokens for this user
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     googleAccessToken: null,
    //     googleRefreshToken: null,
    //     googleTokenExpiry: null,
    //   },
    // });

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/calendar.events",
        ],
      },
    );

    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
