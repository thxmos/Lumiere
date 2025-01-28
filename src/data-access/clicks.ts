import { prisma } from "@/utils/prisma";
import { type BrowserData } from "@/types/clicks";

export const createClick = async (linkId: string, data: BrowserData) => {
  await prisma.click.create({
    data: {
      linkId,
      ...data,
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
