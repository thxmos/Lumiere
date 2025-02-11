"use server";

import { PasswordResetToken } from "@prisma/client";
import { generateTokenWithExpiration } from "@/utils/security/crypto";
import { passwordResetTokenRepository } from "@/repositories/password-reset-token";

type PasswordResetTokenDto = PasswordResetToken;

export const createPasswordResetToken = async (
  userId: string,
): Promise<PasswordResetTokenDto> => {
  const { token, expiresAt } = generateTokenWithExpiration(0.5); // 30 minutes

  const createdToken = await passwordResetTokenRepository.create({
    token,
    user: { connect: { id: userId } },
    expiresAt,
  });

  return createdToken;
};
