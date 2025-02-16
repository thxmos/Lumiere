"use server";

import { PasswordResetTokenDto } from "@/shared/types/entities/auth";
import { passwordResetTokenRepository } from "@/shared/core/db/repositories/password-reset-token";

export async function getPasswordResetTokenByToken(
  token: string,
): Promise<PasswordResetTokenDto> {
  const foundToken = await passwordResetTokenRepository.findByToken(token);
  if (!foundToken) throw new Error("Password reset token not found");
  return foundToken;
}
