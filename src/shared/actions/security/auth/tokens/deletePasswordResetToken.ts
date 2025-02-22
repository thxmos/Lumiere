"use server";

import { passwordResetTokenRepository } from "@core/db/repositories/password-reset-token";

export const deletePasswordResetToken = async (id: string): Promise<void> => {
  await passwordResetTokenRepository.delete(id);
};
