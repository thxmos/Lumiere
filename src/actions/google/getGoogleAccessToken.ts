"use server";

import { prisma } from "@/utils/lib/prisma";
import { googleOAuthClient } from "@/utils/security/googleOauth";

export async function getGoogleAccessToken(userId: string) {
  const googleToken = await prisma.googleToken.findUnique({
    where: { userId },
  });

  if (!googleToken?.googleAccessToken) {
    throw new Error("User not connected to Google");
  }

  if (
    googleToken.googleTokenExpiry &&
    googleToken.googleTokenExpiry < new Date()
  ) {
    const tokens = await googleOAuthClient.refreshAccessToken(
      googleToken.googleRefreshToken ?? "",
    );

    await prisma.googleToken.update({
      where: { userId },
      data: {
        googleAccessToken: tokens.accessToken,
        googleTokenExpiry: tokens.accessTokenExpiresAt,
      },
    });

    return tokens.accessToken;
  }

  return googleToken.googleAccessToken;
}
