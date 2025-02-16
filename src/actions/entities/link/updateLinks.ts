"use server";

import { linkRepository } from "@/modules/shared/core/db/repositories/link";
import { LinkUpdateDto } from "@/modules/shared/core/db/repositories/link/types";

import { SessionUser } from "@/modules/shared/core/auth/lucia";
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
