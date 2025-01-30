"use server";

import { LinkRepository } from "@/repositories/link/link.repository";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const deleteLinkById = withAuth(
  async (user: SessionUser, id: string): Promise<void> => {
    const linkRepository = new LinkRepository();
    await linkRepository.delete(id);
  },
);
