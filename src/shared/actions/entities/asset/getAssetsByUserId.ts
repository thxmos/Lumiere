"use server";

import { assetRepository } from "@/shared/core/db/repositories/asset";
import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/shared/utils/security/auth";

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
