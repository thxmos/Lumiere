import { getLinksByUserId } from "@/data-access/links";

export const getActiveLinksByUserId = async (userId: string) => {
  const links = await getLinksByUserId(userId);
  return links.filter((link) => link.active);
};
