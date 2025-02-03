"use server";

import { ThemeNoId } from "@/types/entities/theme";
import { getThemeByUserId } from "./getThemeByUserId";
import { createTheme } from "./createTheme";
import { updateThemeByUserId } from "./updateThemeByUserId";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

export const upsertTheme = withAuth(
  async (user: SessionUser, theme: ThemeNoId) => {
    const existingTheme = await getThemeByUserId(user.id);
    if (existingTheme) {
      await updateThemeByUserId(theme);
    } else {
      await createTheme(theme);
    }
  },
);
