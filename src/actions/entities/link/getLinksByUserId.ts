"use server";

import { linkRepository } from "@/repositories/link";
import { LinkResponse } from "@/repositories/link/types";
import { userRepository } from "@/repositories/user";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getLinksByUserId = withAuth(
  async (user: SessionUser): Promise<LinkResponse[]> => {
    const links = await linkRepository.getLinksByUserId(user.id);
    return links;
  },
);

export const getActiveLinksByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return [];
  const links = await linkRepository.getLinksByUserId(user.id);
  return links.filter((link) => link.active);
};
