"use server";

import { updateUserById } from "@/actions/entities/User/updateUserById";
import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from "@/actions/entities/VerificationToken/verification-token";

export async function verifyEmailToken(token: string) {
  try {
    const verificationToken = await getVerificationTokenByToken(token);

    if (new Date() > verificationToken.expiresAt) {
      return { message: "Invalid or expired token", success: false };
    }

    // Update user as verified
    await updateUserById(verificationToken.userId, { isVerified: true });

    // Delete the verification token
    await deleteVerificationToken(verificationToken.id);

    return { message: "Email successfully verified!", success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { message: "Failed to verify email", success: false };
  }
}
