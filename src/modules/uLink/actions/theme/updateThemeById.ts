import { ThemeNoId } from "@s-types/entities/theme";
import { withAuth } from "@utils/security/auth";
import { SessionUser } from "@core/auth/lucia";
import { themeRepository } from "@core/db/repositories/theme";

export const updateThemeById = withAuth(
  async (user: SessionUser, themeId: string, theme: ThemeNoId) => {
    await themeRepository.update(themeId, theme as Omit<ThemeNoId, "id">);
  },
);
