// public

import { DEFAULT_THEME } from "@/constants/ui/theme";
import { ThemeNoId } from "@/types/entities/theme";
import { getThemeByUserId } from "./getThemeByUserId";
import { userRepository } from "@/repositories/user";
// TODO: ensure we dont return any sensitive info
export const getThemeByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return DEFAULT_THEME;
  const theme = await getThemeByUserId(user.id);
  if (!theme) return DEFAULT_THEME;

  const { id, ...themeWithoutId } = theme;
  return themeWithoutId as ThemeNoId;
};
