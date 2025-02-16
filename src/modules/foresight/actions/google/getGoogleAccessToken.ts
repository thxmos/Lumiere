"use server";

import { prisma } from "@/shared/core/db/prisma";
import { googleOAuthClient } from "@/shared/utils/security/googleOauth";

export async function getGoogleAccessToken(userId: string) {
  const googleToken = await prisma.googleToken.findFirst({
    where: { user: { id: userId } },
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
      where: { id: googleToken.id },
      data: {
        googleAccessToken: tokens.accessToken,
        googleTokenExpiry: tokens.accessTokenExpiresAt,
      },
    });

    return tokens.accessToken;
  }

  return googleToken.googleAccessToken;
}
