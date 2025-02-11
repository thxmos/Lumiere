"use server";

import { assetRepository } from "@/repositories/asset";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

// TODO: getAllAssetsForUser
export const getAssetsByUserId = withAuth(async (user: SessionUser) => {
  try {
    const assets = await assetRepository.getAllByUserId(user.id);
    return assets;
  } catch (error) {
    console.error("Error getting assets by userId", error);
    return [];
  }
});
