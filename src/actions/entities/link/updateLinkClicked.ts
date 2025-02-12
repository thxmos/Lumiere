"use server";

import { getClientData } from "@/actions/foresight/analytics";
import { clickRepository } from "@/repositories/click";
import { linkRepository } from "@/repositories/link";
import { BrowserData } from "@/types/clicks";

// Can probably assume the click exists if its displayed on the page
export const updateLinkClicked = async (
  linkId: string,
  clientData: Partial<BrowserData>,
) => {
  const link = await linkRepository.findById(linkId);
  // if (!link) throw new Error("Link not found");
  if (!link) return;

  await linkRepository.update(linkId, {
    clicks: { increment: 1 },
  });

  const clickData = await getClientData(clientData);

  await clickRepository.create({
    ...clickData,
    link: { connect: { id: linkId } },
  });
};
