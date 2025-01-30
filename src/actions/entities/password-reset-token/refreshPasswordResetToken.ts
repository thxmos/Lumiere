"use server";

import { generateTokenWithExpiration } from "@/utils/security/crypto";
import { passwordResetTokenRepository } from "@/repositories/password-reset-token";
export async function refreshPasswordResetToken(id: string): Promise<void> {
  await passwordResetTokenRepository.update(id, {
    expiresAt: generateTokenWithExpiration(0.5).expiresAt, // 30 minutes
  });
}
