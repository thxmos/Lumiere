"use server";

import { uploadBlob } from "@/actions/blob.actions";
import { isValidSession } from "@/actions/session.actions";
import { updateUserAvatar } from "@/actions/user.actions";
import {
  getProductById,
  Product2Dto,
  updateProductById,
  type CreateProduct2Dto,
} from "@/data-access/product2";

export async function getProduct(productId: string) {
  return await getProductById(productId);
}

export async function updateProduct(
  productId: string,
  data: Partial<CreateProduct2Dto>,
) {
  const processedData = {
    ...data,
    price: data.price !== undefined ? Number(data.price) : undefined,
  };
  await updateProductById(productId, processedData as Partial<Product2Dto>);
}

export async function uploadImageToBlob(formData: FormData) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("Please select an image to upload.");
  }

  const blob = await uploadBlob(formData);

  if (blob) {
    await updateUserAvatar(blob.url);
    return { success: true, avatarUrl: blob.url };
  } else {
    throw new Error("Failed to upload avatar");
  }
}
