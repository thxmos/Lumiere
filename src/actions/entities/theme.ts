import { DEFAULT_THEME } from "@/constants/theme";

import { ThemeNoId } from "@/types/theme";
import { prisma } from "@/utils/lib/prisma";

export async function getThemeAction(themeUserId: string): Promise<ThemeNoId> {
  const theme = await getThemeByUserId(themeUserId);
  if (!theme) {
    return DEFAULT_THEME;
  }
  const { id, ...themeWithoutId } = theme;
  return themeWithoutId as ThemeNoId;
}

export async function createTheme(userId: string, theme: ThemeNoId) {
  await prisma.theme.create({
    data: {
      ...theme,
      userId,
    },
  });
}

export async function getThemeByUserId(userId: string) {
  const theme = await prisma.theme.findUnique({
    where: { userId },
  });
  return theme;
}

export async function updateThemeByUserId(userId: string, theme: ThemeNoId) {
  const { userId: _, ...themeData } = theme;
  await prisma.theme.update({
    where: { userId },
    data: themeData as Omit<ThemeNoId, "userId">,
  });
}

export async function deleteThemeByUserId(userId: string) {
  await prisma.theme.delete({
    where: { userId },
  });
}
