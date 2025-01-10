import { prisma } from "@/lib/prisma";

export const getClicksByLinkId = async (linkId: string) => {
  const clicks = await prisma.click.findMany({
    where: {
      linkId,
    },
  });
  return clicks;
};
