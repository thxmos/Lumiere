"use server";

import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";
import { userRepository } from "@core/db/repositories/user";

export const updateUserAvatar = withAuth(
  async (user: SessionUser, url: string) => {
    try {
      // if (user?.avatar?.includes("public.blob.vercel-storage.com")) {
      //   await del(user.avatar);
      // }

      await userRepository.update(user.id, { avatar: url });

      return {
        success: true,
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
      };
    }
  },
);
