"use server";

import { themeRepository } from "@/shared/core/db/repositories/theme";
import { ThemeNoId } from "@/shared/types/entities/theme";
import { SessionUser } from "@/shared/core/auth/lucia";
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
