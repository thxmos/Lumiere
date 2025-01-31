"use server";

import { deleteImage } from "../entities/asset/deleteImage";
import { deleteBlob } from "./deleteBlob";

export async function deleteImageAndBlob(imageId: string) {
  await deleteBlob(imageId);
  await deleteImage(imageId);
}
