import { type BrowserData } from "@/types/clicks";
import { Country } from "@prisma/client";
import { ClickRepository } from "@/repositories/click/click.repository";

export const createClick = async (linkId: string, data: BrowserData) => {
  const clickRepository = new ClickRepository();
  await clickRepository.create({
    link: {
      connect: {
        id: linkId,
      },
    },
    ...data,
    country: data.country as Country,
  });
};

// CLICKS:TODO: implement
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
  const clickRepository = new ClickRepository();
  const clicks = await clickRepository.findAllByLinkId(linkId);
  return clicks;
};
