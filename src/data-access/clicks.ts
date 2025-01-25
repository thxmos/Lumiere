import { prisma } from "@/utils/prisma";

export const createClick = async (linkId: string) => {
  await prisma.click.create({
    data: {
      linkId,
    },
  });
};

export const getClicksByLinkId = async (linkId: string) => {
  const clicks = await prisma.click.findMany({
    where: {
      linkId,
    },
  });
  return clicks;
};
