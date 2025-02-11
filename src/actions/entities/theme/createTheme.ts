"use server";

import { themeRepository } from "@/repositories/theme";
import { ThemeNoId } from "@/types/entities/theme";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const createTheme = withAuth(
  async (user: SessionUser, linkGroupId: string, theme: ThemeNoId) => {
    const newTheme = await themeRepository.create({
      ...theme,
      LinkGroup: {
        connect: {
          id: linkGroupId,
        },
      },
    });
    return newTheme;
  },
);
