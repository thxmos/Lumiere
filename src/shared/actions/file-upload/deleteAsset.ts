"use server";

import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@core/auth/lucia";
import { assetRepository } from "@core/db/repositories/asset";
import { del } from "@vercel/blob";

export const deleteAssetById = withAuth(
  async (user: SessionUser, assetId: string) => {
    const asset = await assetRepository.findById(assetId);
    if (!asset) throw new Error("Asset not found");
    console.log("asset", asset);
    if (asset.url) await del(asset.url); // let silently fail if the blob is not found

    try {
      await assetRepository.delete(assetId);
    } catch (error) {
      throw new Error("Failed to delete asset");
    }
  },
);
