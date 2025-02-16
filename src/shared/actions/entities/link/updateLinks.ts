"use server";

import { linkRepository } from "@/shared/core/db/repositories/link";
import { LinkUpdateDto } from "@/shared/core/db/repositories/link/types";

import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/utils/security/auth";

// TODO: updateMany doesnt work so making seperate requests... bleh
export const updateLinks = withAuth(
  async (user: SessionUser, data: LinkUpdateDto[]): Promise<void> => {
    for (const link of data) {
      await linkRepository.update(link.id, {
        ...link,
      });
    }
  },
);
