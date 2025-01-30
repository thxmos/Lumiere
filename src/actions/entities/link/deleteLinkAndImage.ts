"use server";

import { AssetRepository } from "@/repositories/asset/asset.repository";
import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkResponse } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const deleteLinkAndImage = withAuth(
  async (user: SessionUser, link: LinkResponse) => {
    const linkRepository = new LinkRepository();
    await linkRepository.delete(link.id);
    if (link.imageUrl) {
      // TODO: not fully functional until entities are implemented
      const assetRepository = new AssetRepository();
      await assetRepository.delete(link.imageUrl);
    }
  },
);
