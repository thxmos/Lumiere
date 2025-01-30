"use server";

import { themeRepository } from "@/repositories/theme";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

//TODO: i think theme and user have same id, i should have documented this
export const deleteThemeByUserId = withAuth(async (user: SessionUser) => {
  await themeRepository.delete(user.id);
});
