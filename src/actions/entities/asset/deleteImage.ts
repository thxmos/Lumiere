"use server";

import { prisma } from "@/utils/lib/prisma";

//TODO: clean up and rename to Assets

export type CreateImageDto = {
  url: string;
  userId: string;
  title: string;
  description: string;
};

export const deleteImage = async (id: string, userId: string) => {
  const deletedAsset = await prisma.image.delete({
    where: { id, userId },
  });
  return deletedAsset;
};
