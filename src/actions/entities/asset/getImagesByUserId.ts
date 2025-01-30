"use server";

import { assetRepository } from "@/repositories/asset";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

// getAllImagesForUser
export const getImagesByUserId = withAuth(async (user: SessionUser) => {
  const images = await assetRepository.getAllByUserId(user.id);
  return images;
});
