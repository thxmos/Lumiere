"use server";

import { LinkRepository } from "@/repositories/link/link.repository";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import { Link } from "@prisma/client";

export const updateLinkById = withAuth(
  async (user: SessionUser, id: string, data: Partial<Link>): Promise<void> => {
    const linkRepository = new LinkRepository();
    await linkRepository.update(id, data);
  },
);
