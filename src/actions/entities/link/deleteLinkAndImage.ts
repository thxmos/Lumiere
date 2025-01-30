"use server";

import { assetRepository } from "@/repositories/asset";
import { linkRepository } from "@/repositories/link";
import { LinkResponse } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const deleteLinkAndImage = withAuth(
  async (user: SessionUser, link: LinkResponse) => {
    await linkRepository.delete(link.id);
    if (link.imageUrl) {
      // TODO: not fully functional until entities are implemented
      await assetRepository.delete(link.imageUrl);
    }
  },
);
