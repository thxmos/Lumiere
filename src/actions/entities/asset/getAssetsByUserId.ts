"use server";

import { assetRepository } from "@/repositories/asset";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

// TODO: getAllAssetsForUser
export const getAssetsByUserId = withAuth(async (user: SessionUser) => {
  const assets = await assetRepository.getAllByUserId(user.id);
  return assets;
});
