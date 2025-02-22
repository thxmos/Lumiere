"use server";

import { withAuth } from "@utils/security/auth";

import { SessionUser } from "@core/auth/lucia";
import { LinkGroupUpdateInput } from "@core/db/repositories/linkGroup/types";
import { linkGroupRepository } from "@core/db/repositories/linkGroup";

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
