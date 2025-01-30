"use server";

import { linkRepository } from "@/repositories/link";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const deleteLinkById = withAuth(
  async (user: SessionUser, id: string): Promise<void> => {
    await linkRepository.delete(id);
  },
);
