"use server";

import { linkGroupRepository } from "@/repositories/linkGroup";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getLinkGroupsByUserId = withAuth(async (user: SessionUser) => {
  const linkGroups = await linkGroupRepository.findByUserId(user.id);
  return linkGroups;
});
