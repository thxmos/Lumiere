"use server";

import { ThemeNoId } from "@/shared/types/entities/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { createTheme } from "./createTheme";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/core/auth/lucia";
import { updateThemeById } from "./updateThemeById";

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
