"use server";

import { DEFAULT_THEME } from "@/constants/theme";
import { ThemeNoId } from "@/types/theme";
import { getThemeByUserId } from "./getThemeByUserId";
import { userRepository } from "@/repositories/user";

// TODO: clean up
export async function getThemeAction(themeUserId: string): Promise<ThemeNoId> {
  const theme = await getThemeByUserId(themeUserId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  const { id, ...themeWithoutId } = theme;
  return themeWithoutId as ThemeNoId;
}

// public
export const getThemeByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return DEFAULT_THEME;
  const theme = await getThemeByUserId(user.id);
  if (!theme) return DEFAULT_THEME;
  return theme;
};
