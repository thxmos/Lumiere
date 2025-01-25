import { DEFAULT_THEME } from "@/constants/theme";
import { getThemeByUserId, ThemeNoId } from "@/data-access/theme";

export async function getTheme(themeUserId: string): Promise<ThemeNoId> {
  const theme = await getThemeByUserId(themeUserId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  const { id, ...themeWithoutId } = theme;
  return themeWithoutId as ThemeNoId;
}
