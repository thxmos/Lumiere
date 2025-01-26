"use server";

import {
  getThemeByUserId,
  updateThemeByUserId,
  createTheme,
} from "@/data-access/theme";
import type { ThemeNoId } from "@/types/theme";

export async function upsertTheme(userId: string, theme: ThemeNoId) {
  const existingTheme = await getThemeByUserId(userId);
  if (existingTheme) {
    await updateThemeByUserId(userId, theme);
  } else {
    await createTheme(userId, theme);
  }
}
