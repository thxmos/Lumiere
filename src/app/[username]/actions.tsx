"use server";

import { getLinkById, getLinksByUserId, updateLink } from "@/data-access/links";
import { createClick } from "@/data-access/clicks";

export const getActiveLinksByUserId = async (userId: string) => {
  const links = await getLinksByUserId(userId);
  return links.filter((link) => link.active);
};

export const updateLinkClicked = async (linkId: string) => {
  const link = await getLinkById(linkId);
  if (!link) throw new Error("Link not found");
  link.clicks = (link.clicks || 0) + 1;
  await updateLink(linkId, link);
  await createClick(linkId);
};
