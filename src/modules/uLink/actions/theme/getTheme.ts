"use server";

import { DEFAULT_THEME } from "@ulink/default-theme";
import { ThemeNoId } from "@s-types/entities/theme";
import { getThemeByUserId } from "@ulink/actions/theme/_getThemeByUserId";
import { withAuth } from "@utils/security/auth";
import { SessionUser } from "@core/auth/lucia";

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
