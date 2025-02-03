"use server";
import { prisma } from "@/utils/lib/prisma";
import { googleOAuthClient } from "@/utils/security/googleOauth";

export async function getGoogleAccessToken(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleAccessToken: true,
      googleRefreshToken: true,
      googleTokenExpiry: true,
    },
  });

  if (!user?.googleAccessToken) {
    throw new Error("User not connected to Google");
  }

  // Check if token is expired
  if (user.googleTokenExpiry && user.googleTokenExpiry < new Date()) {
    // Token is expired, need to refresh
    const tokens = await googleOAuthClient.refreshAccessToken(
      user.googleRefreshToken ?? "",
    );

    // Update tokens in database
    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: tokens.accessToken,
        googleTokenExpiry: tokens.accessTokenExpiresAt, // might be wrong
      },
    });

    return tokens.accessToken;
  }

  return user.googleAccessToken;
}
