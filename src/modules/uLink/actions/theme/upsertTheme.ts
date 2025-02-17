"use server";

import { ThemeNoId } from "@/shared/types/entities/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { createTheme } from "./createTheme";
import { withAuth } from "@/shared/utils/security/auth";
import { updateThemeById } from "./updateThemeById";
import { SessionUser } from "@/shared/core/auth/lucia";
export const upsertTheme = withAuth(
  async (user: SessionUser, theme: ThemeNoId) => {
    const existingTheme = await getThemeByUserId(user.id);
    if (existingTheme) {
      //TODO: take out linkgroupId
      await updateThemeById(existingTheme.linkGroupId, theme);
    } else {
      await createTheme(user.id, theme);
    }
  },
);
