"use server";

import { isValidSession } from "@/actions/session";
import { createProduct, getProductsByUserId } from "@/data-access/product2";
import type { CreateProduct2Dto } from "@/types/product2";

export async function createNewProduct(
  userId: string,
  product: CreateProduct2Dto,
) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  await createProduct(userId, product);
}

export async function getProducts(userId: string) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }
  return await getProductsByUserId(userId);
}

// export async function updateProduct(
//   productId: string,
//   data: Partial<CreateProduct2Dto>,
// ) {
//   try {
//     const processedData = {
//       ...data,
//       price: data.price !== undefined ? Number(data.price) : undefined,
//     };
//     await updateProduct(productId, processedData);
//     revalidatePath("/dashboard/merch");
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to update product", error);
//     return { error: "Failed to update product" };
//   }
// }
