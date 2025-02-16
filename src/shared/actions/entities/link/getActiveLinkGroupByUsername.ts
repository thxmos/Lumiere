"use server";

import {
  linkGroupRepository,
  LinkGroupWithLinks,
} from "@/shared/core/db/repositories/linkGroup";
import { userRepository } from "@/shared/core/db/repositories/user";

/*
 * getActiveLinkGroupsByUsername()
 * Used on public ULink profile page
 */

export const getActiveLinkGroupByUsername = async (
  username: string,
): Promise<LinkGroupWithLinks | null> => {
  const user = await userRepository.findByUsername(username);
  if (!user) return null;
  const linkGroup =
    await linkGroupRepository.findActiveLinkGroupByUsername(username);
  if (!linkGroup) return null;
  return { ...linkGroup, Links: linkGroup.Links || [] };
};
