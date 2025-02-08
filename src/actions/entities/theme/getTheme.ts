"use server";

import { DEFAULT_THEME } from "@/constants/ui/theme";
import { ThemeNoId } from "@/types/entities/theme";
import { getThemeByUserId } from "./getThemeByUserId";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

export const getThemeAction = withAuth(
  async (user: SessionUser): Promise<ThemeNoId> => {
    const theme = await getThemeByUserId(user.id);
    if (!theme) {
      return DEFAULT_THEME;
    }
    const { id, ...themeWithoutId } = theme;
    return themeWithoutId as ThemeNoId;
  },
);
