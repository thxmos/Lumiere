"use server";

import { themeRepository } from "@/modules/shared/core/db/repositories/theme";
import { ThemeNoId } from "@/modules/shared/types/entities/theme";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
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
