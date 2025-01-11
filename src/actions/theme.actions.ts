import { DEFAULT_THEME } from "@/constants";
import { CreateThemeDto, getThemeByUserId } from "@/data-access/theme";

export async function getTheme(userId: string): Promise<CreateThemeDto> {
  const theme = await getThemeByUserId(userId);
  console.log("theme", theme);
  if (!theme) {
    return DEFAULT_THEME as CreateThemeDto;
  }
  return theme as CreateThemeDto;
}
