"use server";

import { assetRepository } from "@/repositories/asset";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

//TODO: clean up and rename to Assets

export const deleteImage = withAuth(async (user: SessionUser, id: string) => {
  const deletedAsset = await assetRepository.delete(id);
  return deletedAsset;
});
