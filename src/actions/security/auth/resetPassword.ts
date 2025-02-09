"use server";

import { prisma } from "@/utils/lib/prisma";
import { hash } from "@/utils/security/crypto";
import { getPasswordResetTokenByToken } from "../../entities/password-reset-token/getPasswordResetTokenByToken";

export async function resetPassword(token: string, password: string) {
  try {
    if (!token || typeof token !== "string") {
      return { message: "Invalid token", success: false };
    }

    if (!password || typeof password !== "string") {
      return { message: "Invalid password", success: false };
    }

    const hashedPassword = await hash(password);

    const resetToken = await getPasswordResetTokenByToken(token);

    if (new Date() > resetToken.expiresAt) {
      return { message: "Token is invalid or has expired", success: false };
    }

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { message: "Password successfully reset!", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong", success: false };
  }
}
