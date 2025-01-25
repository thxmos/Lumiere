import { prisma } from "@/utils/prisma";
import { Theme } from "@prisma/client";

export type ThemeNoId = Omit<Theme, "id">;

export type CreateThemeDto = {
  userId: string;
  primaryColor: string;

  fontFamily: string;
  fontWeight: number;
  fontColor: string;
  secondaryColorFont: string;

  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;

  cardBackgroundColor: string;
  iconColor: string;

  backgroundType: string; // "color" | "image" | "video"
  backgroundColor: string;
  backgroundImageUrl: string;
  videoUrl: string;
};

export type ThemeDto = CreateThemeDto & {
  id: string;
};

export async function createTheme(
  userId: string,
  theme: Omit<CreateThemeDto, "userId">,
) {
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

export async function updateThemeByUserId(
  userId: string,
  theme: Omit<CreateThemeDto, "userId">,
) {
  const { userId: _, ...themeData } = theme as any;
  await prisma.theme.update({
    where: { userId },
    data: themeData,
  });
}

export async function deleteThemeByUserId(userId: string) {
  await prisma.theme.delete({
    where: { userId },
  });
}
