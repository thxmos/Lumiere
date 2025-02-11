"use server";

import { DEFAULT_THEME } from "@/constants/ui/theme";
import { ThemeNoId } from "@/types/entities/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

//TODO: get theme by linkgroup

export const getThemeAction = withAuth(
  async (user: SessionUser): Promise<ThemeNoId> => {
    try {
      const theme = await getThemeByUserId(user.id);
      if (!theme) {
        return DEFAULT_THEME;
      }
      const { id, ...themeWithoutId } = theme;
      return themeWithoutId as ThemeNoId;
    } catch (error) {
      console.error("Error getting theme", error);
      return DEFAULT_THEME;
    }
  },
);
