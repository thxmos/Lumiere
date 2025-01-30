"use server";

import { prisma } from "@/utils/lib/prisma";

export const getImagesByUserId = async (userId: string) => {
  const images = await prisma.image.findMany({
    where: { userId },
  });
  return images;
};
