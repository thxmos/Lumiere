import { ThemeNoId } from "@/modules/shared/types/entities/theme";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
import { themeRepository } from "@/modules/shared/core/db/repositories/theme";

export const updateThemeById = withAuth(
  async (user: SessionUser, themeId: string, theme: ThemeNoId) => {
    await themeRepository.update(themeId, theme as Omit<ThemeNoId, "id">);
  },
);
