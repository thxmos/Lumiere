"use server";

import { getClientData } from "@/modules/foresight/actions/analytics";
import { clickRepository } from "@/shared/core/db/repositories/click";
import { linkRepository } from "@/shared/core/db/repositories/link";
import { BrowserData } from "@/shared/types/clicks";

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
