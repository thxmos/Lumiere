"use server";

import { linkGroupRepository } from "@core/db/repositories/linkGroup";
import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";

export const getLinkGroupsByUserId = withAuth(async (user: SessionUser) => {
  try {
    const linkGroups = await linkGroupRepository.findByUserId(user.id);
    return linkGroups;
  } catch (error) {
    console.error("Error getting link groups by userId", error);
    return [];
  }
});
