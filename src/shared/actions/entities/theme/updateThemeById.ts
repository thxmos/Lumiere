import { ThemeNoId } from "@/shared/types/entities/theme";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";
import { themeRepository } from "@/shared/core/db/repositories/theme";

export const updateThemeById = withAuth(
  async (user: SessionUser, themeId: string, theme: ThemeNoId) => {
    await themeRepository.update(themeId, theme as Omit<ThemeNoId, "id">);
  },
);
