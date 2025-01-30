"use server";

import { withAuth } from "@/utils/security/auth";

import { LinkUpdateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { linkRepository } from "@/repositories/link";

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
