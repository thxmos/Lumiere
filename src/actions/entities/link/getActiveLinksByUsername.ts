"use server";

import { linkRepository } from "@/repositories/link";
import { userRepository } from "@/repositories/user";

// public
export const getActiveLinksByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return [];
  const links = await linkRepository.getLinksByUserId(user.id);
  return links.filter((link) => link.active);
};
