"use server";

import { createImage } from "@/data-access/images";
import { getUser } from "./session.actions";
import { updateUserAvatar } from "./user.actions";
import { put, del } from "@vercel/blob";

/*
should use uploadImageAction instead
retrieve URL and save to User entity
*/
export async function uploadAvatar(formData: FormData) {
  const path = "avatars/";
  const file = formData.get("file") as File;
  const blob = await uploadBlob(file, path);

  if (blob) {
    await updateUserAvatar(blob.url);
  } else {
    await deleteBlob(path);
    throw new Error("Failed to update avatar");
  }
}

export async function uploadLinkImage(formData: FormData) {
  const path = "links/";
  const file = formData.get("file") as File;
  return await uploadImageAction(file, path);
}

/*
Authenticated user uploads an image to the blob, creates an image in the database, and returns the URL of the image if successful.
If the image fails to be created in the database, the blob image is deleted.
*/
export async function uploadImageAction(file: File, path: string) {
  const { user } = await getUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }

  const blobResult = await uploadBlob(file, path);

  if (blobResult) {
    try {
      const image = await createImage({ url: blobResult.url, userId: user.id });
      return image.url;
    } catch (error) {
      await deleteBlob(path);
      throw new Error(
        error instanceof Error ? error.message : "Failed to save image",
      );
    }
  } else {
    throw new Error("Failed to upload image");
  }
}

/*
Uploads an image to the blob and returns the URL of the image if successful.
*/
const uploadBlob = async (file: File, path: string, maxSize: number = 20) => {
  if (!file) throw new Error("Please select an image to upload.");

  if (file.size / 1024 / 1024 > maxSize)
    throw new Error(
      `File size ${file.size / 1024 / 1024}MB is too large. Max ${maxSize}MB`,
    );

  try {
    const { user } = await getUser();

    const blob = await put(`${path}${user?.id}`, file, {
      contentType: file.type,
      access: "public",
    });

    return blob;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteBlob = async (path: string) => {
  const { user } = await getUser();

  await del(`${path}${user?.id}`);
};
