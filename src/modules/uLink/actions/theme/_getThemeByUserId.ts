"use server";

import { prisma } from "@/shared/core/db/prisma";
import { Theme } from "@prisma/client";

//TODO: should just get the theme by linkgroup
export async function getThemeByUserId(userId: string): Promise<Theme | null> {
  const theme = await prisma.theme.findFirst({
    where: {
      LinkGroup: {
        User: {
          some: {
            id: userId,
          },
        },
      },
    },
  });
  return theme;
}
