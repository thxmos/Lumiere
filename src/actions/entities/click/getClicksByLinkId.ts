"use server";

import { clickRepository } from "@/repositories/click";

export const getClicksByLinkId = async (linkId: string) => {
  const clicks = await clickRepository.getAllByLinkId(linkId);
  return clicks;
};
