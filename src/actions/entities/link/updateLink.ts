"use server";

import { withAuth } from "@/utils/security/auth";

import { LinkUpdateInput } from "@/modules/shared/core/db/repositories/link/types";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
import { linkRepository } from "@/modules/shared/core/db/repositories/link";

export const updateLink = withAuth(
  async (
    user: SessionUser,
    id: string,
    data: LinkUpdateInput,
  ): Promise<void> => {
    const { id: linkId, ...linkData } = data;
    await linkRepository.update(id, linkData);
  },
);
