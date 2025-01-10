import { prisma } from "@/lib/prisma";

export type CreateThemeDto = {
  userId: string;
  fontFamily: string;
  fontWeight: number;
  fontColor: string;
  secondaryColorFont: string;

  backgroundColor: string;
  backgroundImageUrl: string;
  videoUrl: string;
  videoBackgroundActive: boolean;
  cardBackgroundColor: string;

  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;
};

export type ThemeDto = CreateThemeDto & {
  id: string;
};

export async function createTheme(userId: string, theme: CreateThemeDto) {
  await prisma.theme.create({
    data: {
      ...theme,
      userId,
    },
  });
}

export async function getThemeByUserId(userId: string) {
  return await prisma.theme.findUnique({
    where: { userId },
  });
}

export async function updateThemeByUserId(
  userId: string,
  theme: CreateThemeDto,
) {
  await prisma.theme.update({
    where: { userId },
    data: theme,
  });
}

export async function deleteThemeByUserId(userId: string) {
  await prisma.theme.delete({
    where: { userId },
  });
}
