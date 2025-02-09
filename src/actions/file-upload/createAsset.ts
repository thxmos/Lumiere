"use server";

import { uploadBlob } from "./uploadBlob";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
import {
  type AssetCreateInput,
  assetRepository,
  AssetResponse,
} from "@/repositories/asset";
import { updateUserAvatar } from "@/actions/entities/user/updateUserAvatar";
import { del } from "@vercel/blob";
import { updateProduct } from "../entities/product/product2";
import { AssetType } from "@prisma/client";

/*
Authenticated user uploads an image to the blob, creates an image in the database, and returns the URL of the image if successful.
If the image fails to be created in the database, the blob image is deleted.
*/

export const createAsset = withAuth(
  async (
    user: SessionUser,
    file: File,
    data: Omit<AssetCreateInput, "User">,
    maxSizeInMb = 20,
  ): Promise<AssetResponse> => {
    const blobResult = await uploadBlob(file, maxSizeInMb);

    if (blobResult) {
      try {
        const asset = await assetRepository.create({
          ...data,
          url: blobResult.url,
          type: file.type.includes("image") ? AssetType.IMAGE : AssetType.VIDEO,
          User: {
            connect: {
              id: user.id,
            },
          },
        });
        return asset;
      } catch (error) {
        // If uploaded to blob but asset creation failed, delete the blob
        await del(`${user.id}-asset-${blobResult.url}`);
        throw new Error(
          error instanceof Error ? error.message : "Failed to save image",
        );
      }
    } else {
      throw new Error("Failed to upload image");
    }
  },
);

export const uploadAsset = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  console.log(file, title, description);

  const newAsset = await createAsset(file, {
    title,
    description,
  });

  return newAsset;
};

export const uploadAvatar = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    // Create
    const newAsset = await createAsset(file, {
      title: "Avatar",
      description: "User avatar",
    });
    // Get new Asset by Id and update user avatar with url
    const asset = await assetRepository.findById(newAsset.id);
    if (!asset?.url) throw new Error("Failed to upload avatar image");
    await updateUserAvatar(asset.url);
  } catch (error) {
    throw new Error("Failed to update avatar");
  }
};

//replace both with createAsset
export async function uploadLinkImage(
  formData: FormData,
  data: AssetCreateInput,
) {
  const file = formData.get("file") as File;

  const newAsset = await createAsset(file, data);
  return await createAsset(file, data);
}
