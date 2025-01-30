"use server";

import { withAuth } from "@/utils/security/auth";

import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkUpdateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";

export const updateLink = withAuth(
  async (
    user: SessionUser,
    id: string,
    data: LinkUpdateInput,
  ): Promise<void> => {
    const linkRepository = new LinkRepository();
    const { id: linkId, ...linkData } = data;

    await linkRepository.update(id, linkData);
  },
);
