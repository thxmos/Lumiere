"use server";

import { themeRepository } from "@/repositories/theme";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

//TODO: i think theme and user have same id, i should have documented this
//TODO: make theme have its own unique id and have a many to one relationship with user
//TODO: still limit themes to 1 per user for now
export const deleteThemeByUserId = withAuth(async (user: SessionUser) => {
  await themeRepository.delete(user.id);
});
