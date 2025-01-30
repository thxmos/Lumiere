"use server";

import { linkRepository } from "@/repositories/link";
import { LinkCreateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const createLinks = withAuth(
  async (user: SessionUser, data: LinkCreateInput[]): Promise<void> => {
    await linkRepository.createMany(
      user,
      data.map((link) => ({ ...link, user: { connect: { id: user.id } } })),
    );
  },
);
