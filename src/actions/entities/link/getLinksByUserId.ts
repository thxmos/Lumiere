"use server";

import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkResponse } from "@/repositories/link/types";

export async function getLinksByUserId(
  userId: string,
): Promise<LinkResponse[]> {
  const linkRepository = new LinkRepository();
  const links = await linkRepository.getLinksByUserId(userId);
  return links;
}
