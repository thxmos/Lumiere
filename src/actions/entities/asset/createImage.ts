"use server";

import { prisma } from "@/utils/lib/prisma";
import { CreateImageDto } from "./deleteImage";

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
