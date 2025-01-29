"use server";

import { deleteProduct2ById } from "@/actions/entities/product2";

export const deleteProductById = async (productId: string) => {
  await deleteProduct2ById(productId);
};
