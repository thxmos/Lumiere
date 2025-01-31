"use server";

import { getClientData } from "@/actions/getClientData";
import { linkRepository } from "@/repositories/link";
import { userRepository } from "@/repositories/user";
import { BrowserData } from "@/types/clicks";

// public
export const getActiveLinksByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return [];
  const links = await linkRepository.getLinksByUserId(user.id);
  return links.filter((link) => link.active);
};

export const createClickForSocialAction = async (
  socialPlatformClicked: string,
  clientData: Partial<BrowserData>,
) => {
  const clickData = await getClientData(clientData);
  // await createClickSocial(socialPlatformClicked, clickData as BrowserData);
};
