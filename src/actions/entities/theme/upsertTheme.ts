"use server";

import { ThemeNoId } from "@/types/entities/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { createTheme } from "./createTheme";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
import { updateThemeById } from "./updateThemeById";

export const upsertTheme = withAuth(
  async (user: SessionUser, theme: ThemeNoId) => {
    const existingTheme = await getThemeByUserId(user.id);
    if (existingTheme) {
      //TODO: take out linkgroupId
      await updateThemeById(existingTheme.id, theme);
    } else {
      await createTheme(theme);
    }
  },
);
