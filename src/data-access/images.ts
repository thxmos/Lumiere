import { prisma } from "@/utils/prisma";

export type CreateImageDto = {
  url: string;
  userId: string;
};

export const createImage = async (image: CreateImageDto) => {
  const newImage = await prisma.image.create({
    data: image,
  });
  return newImage;
};

export const getImagesByUserId = async (userId: string) => {
  const images = await prisma.image.findMany({
    where: { userId },
  });
  return images;
};

export const deleteImage = async (id: string, userId: string) => {
  const deletedImage = await prisma.image.delete({
    where: { id, userId },
  });
  return deletedImage;
};
