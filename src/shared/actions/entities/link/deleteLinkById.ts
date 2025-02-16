"use server";

import { del } from "@vercel/blob";
import { linkRepository } from "@/shared/core/db/repositories/link";
import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/utils/security/auth";
import { assetRepository } from "@/shared/core/db/repositories/asset";

/*
 * deleteLinkById
 *
 * Get full link object, delete from blob if exists
 * Then delete link from database
 * If the image fails to be deleted from the blob storage, let it silently fail.
 */

export const deleteLinkById = withAuth(
  async (user: SessionUser, id: string): Promise<void> => {
    const link = await linkRepository.findById(id);
    const assetId = link?.imageId;

    if (assetId) {
      const asset = await assetRepository.findById(assetId);
      if (!asset?.url) {
        // silently fail and log error
        console.error("Failed to delete link image");
        return;
      }
      await del(asset.url);
    }

    try {
      await linkRepository.delete(id);
    } catch (error) {
      throw new Error("Failed to delete link");
    }
  },
);
