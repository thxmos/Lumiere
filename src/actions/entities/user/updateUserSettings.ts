"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { User } from "@prisma/client";
import { withAuth } from "@/utils/security/auth";
import { updateUserById } from "./updateUserById";
//TODO: delete, use normal update user OR atleast make sure its only for settings
export const updateUserSettings = withAuth(
  async (user: SessionUser, data: Partial<User>) => {
    await updateUserById(user.id, data);
  },
);
