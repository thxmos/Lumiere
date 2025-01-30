"use server";

import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkCreateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const createLinks = withAuth(
  async (user: SessionUser, data: LinkCreateInput[]): Promise<void> => {
    const linkRepository = new LinkRepository();
    await linkRepository.createMany(
      user,
      data.map((link) => ({ ...link, user: { connect: { id: user.id } } })),
    );
  },
);
