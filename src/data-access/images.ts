import { prisma } from "@/utils/prisma";

export type CreateImageDto = {
  url: string;
  userId: string;
  title: string;
  description: string;
};

export const createImage = async (image: CreateImageDto) => {
  const newImage = await prisma.image.create({
    data: {
      url: image.url,
      userId: image.userId,
      title: image.title,
      description: image.description,
    },
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
