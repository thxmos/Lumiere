"use server";

import {
  getThemeByUserId,
  updateThemeByUserId,
  createTheme,
  CreateThemeDto,
} from "@/data-access/theme";

export async function upsertTheme(
  userId: string,
  theme: Omit<CreateThemeDto, "userId">,
) {
  const existingTheme = await getThemeByUserId(userId);
  if (existingTheme) {
    await updateThemeByUserId(userId, theme);
  } else {
    await createTheme(userId, theme);
  }
}
