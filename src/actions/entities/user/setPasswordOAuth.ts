"use server";

import { hash } from "@/utils/security/crypto";
import { updateUserById } from "./updateUserById";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

/*
 * setPasswordOAuth()
 * Used on security page to set password for OAuth users
 */

export const setPasswordOAuth = withAuth(
  async (user: SessionUser, formData: FormData) => {
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || !confirmPassword) {
      throw new Error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirmation do not match");
    }

    try {
      const hashedPassword = await hash(newPassword);

      await updateUserById(user.id, { password: hashedPassword });

      return { success: true, message: "Password set successfully" };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  },
);
