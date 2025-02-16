"use server";

import { DEFAULT_THEME } from "@/config/theme/theme";
import { ThemeNoId } from "@/shared/types/entities/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";

//TODO: get theme by linkgroup

export const getThemeAction = withAuth(
  async (user: SessionUser): Promise<ThemeNoId> => {
    try {
      const theme = await getThemeByUserId(user.id);
      if (!theme) {
        return DEFAULT_THEME;
      }
      const { ...themeWithoutId } = theme;
      return themeWithoutId as ThemeNoId;
    } catch (error) {
      console.error("Error getting theme", error);
      return DEFAULT_THEME;
    }
  },
);
