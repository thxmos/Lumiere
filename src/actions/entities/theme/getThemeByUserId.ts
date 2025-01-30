"use server";

import { prisma } from "@/utils/lib/prisma";
import { Theme } from "@prisma/client";

export async function getThemeByUserId(userId: string): Promise<Theme | null> {
  const theme = await prisma.theme.findUnique({
    where: { userId },
  });
  return theme;
}
