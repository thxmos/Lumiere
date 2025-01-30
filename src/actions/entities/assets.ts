"use server";

import { prisma } from "@/utils/lib/prisma";

//TODO: clean up and rename to Assets

export type CreateImageDto = {
  url: string;
  userId: string;
  title: string;
  description: string;
};

export const createImage = async (asset: CreateImageDto) => {
  const newAsset = await prisma.image.create({
    data: {
      url: asset.url,
      userId: asset.userId,
      title: asset.title,
      description: asset.description,
    },
  });
  return newAsset;
};

export const getImagesByUserId = async (userId: string) => {
  const images = await prisma.image.findMany({
    where: { userId },
  });
  return images;
};

export const deleteImage = async (id: string, userId: string) => {
  const deletedAsset = await prisma.image.delete({
    where: { id, userId },
  });
  return deletedAsset;
};
