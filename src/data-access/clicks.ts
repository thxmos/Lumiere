import { prisma } from "@/utils/lib/prisma";
import { type BrowserData } from "@/types/clicks";
import { Country } from "@prisma/client";

export const createClick = async (linkId: string, data: BrowserData) => {
  await prisma.click.create({
    data: {
      linkId,
      ...data,
      country: data.country as Country, // TODO: fix this
    },
  });
};

export const createClickSocial = async (
  socialPlatformClicked: string,
  data: BrowserData,
) => {
  // await prisma.click.create({
  //   data: {
  //     ...data,
  //     socialPlatformClicked,
  //     country: data.country as Country, // TODO: fix this
  //   },
  // });
  console.log("socialPlatformClicked", socialPlatformClicked);
  // TODO: implement
};

export const getClicksByLinkId = async (linkId: string) => {
  const clicks = await prisma.click.findMany({
    where: {
      linkId,
    },
  });
  return clicks;
};
