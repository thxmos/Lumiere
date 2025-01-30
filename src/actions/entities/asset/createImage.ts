"use server";

import { assetRepository } from "@/repositories/asset";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export type CreateImageDto = {
  id?: string;
  url: string;
  userId: string;
  title: string;
  description: string;
};

export const createImage = withAuth(
  async (user: SessionUser, asset: CreateImageDto) => {
    const newAsset = await assetRepository.create({
      ...asset,
      User: { connect: { id: user.id } },
    });
    return newAsset;
  },
);
