"use server";

import { linkRepository } from "@/repositories/link";
import { LinkResponse } from "@/repositories/link/types";
import { userRepository } from "@/repositories/user";

export async function getLinksByUserId(
  userId: string,
): Promise<LinkResponse[]> {
  const links = await linkRepository.getLinksByUserId(userId);
  return links;
}

export const getActiveLinksByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return [];
  const links = await linkRepository.getLinksByUserId(user.id);
  return links.filter((link) => link.active);
};
