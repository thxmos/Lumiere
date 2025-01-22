import { DEFAULT_THEME } from "@/constants/theme";
import { CreateThemeDto, getThemeByUserId } from "@/data-access/theme";

export async function getTheme(
  themeUserId: string,
): Promise<Omit<CreateThemeDto, "userId">> {
  const theme = await getThemeByUserId(themeUserId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  const { userId, ...themeWithoutUserId } = theme;
  return themeWithoutUserId as Omit<CreateThemeDto, "userId">;
}
