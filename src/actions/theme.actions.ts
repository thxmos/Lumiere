import { DEFAULT_THEME } from "@/constants";
import { CreateThemeDto, getThemeByUserId } from "@/data-access/theme";

export async function getTheme(userId: string): Promise<CreateThemeDto> {
  const theme = await getThemeByUserId(userId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  return theme as CreateThemeDto;
}
