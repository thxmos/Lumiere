import { ThemeNoId } from "@/types/entities/theme";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
import { themeRepository } from "@/repositories/theme";

export const updateThemeByUserId = withAuth(
  async (user: SessionUser, theme: ThemeNoId) => {
    const { userId: _, ...themeData } = theme;
    await themeRepository.update(
      user.id,
      themeData as Omit<ThemeNoId, "userId">,
    );
  },
);
