"use server";

import { deleteBlob, uploadBlob } from "@/actions/blob.actions";
import { updateUserAvatar } from "@/actions/user.actions";

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
  const blob = await uploadBlob(file, path);

  if (blob) {
    // await updateUserAvatar(blob.url);
    // await upsertLinkImage(blob.url);
  } else {
    await deleteBlob(path);
    throw new Error("Failed to upload link image");
  }
}
