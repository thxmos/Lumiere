import { DEFAULT_THEME } from "@/constants/theme";
import { getThemeByUserId } from "@/data-access/theme";
import { ThemeNoId } from "@/types/theme";

export async function getThemeAction(themeUserId: string): Promise<ThemeNoId> {
  const theme = await getThemeByUserId(themeUserId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  const { id, ...themeWithoutId } = theme;
  return themeWithoutId as ThemeNoId;
}
