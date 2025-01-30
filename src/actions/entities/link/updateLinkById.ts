"use server";

import { linkRepository } from "@/repositories/link";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import { Link } from "@prisma/client";

export const updateLinkById = withAuth(
  async (user: SessionUser, id: string, data: Partial<Link>): Promise<void> => {
    await linkRepository.update(id, data);
  },
);
