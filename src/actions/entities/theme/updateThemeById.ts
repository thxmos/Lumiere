import { ThemeNoId } from "@/types/entities/theme";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
import { themeRepository } from "@/repositories/theme";

export const updateThemeById = withAuth(
  async (user: SessionUser, themeId: string, theme: ThemeNoId) => {
    await themeRepository.update(themeId, theme as Omit<ThemeNoId, "id">);
  },
);
