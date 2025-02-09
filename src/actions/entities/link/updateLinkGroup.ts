"use server";

import { withAuth } from "@/utils/security/auth";

import { SessionUser } from "@/utils/lib/lucia";
import { LinkGroupUpdateInput } from "@/repositories/linkGroups/types";
import { linkGroupRepository } from "@/repositories/linkGroups";

export const updateLinkGroup = withAuth(
  async (
    user: SessionUser,
    linkGroupId: string,
    data: LinkGroupUpdateInput,
  ): Promise<void> => {
    console.log(linkGroupId, data);
    await linkGroupRepository.update(linkGroupId, data);
  },
);
