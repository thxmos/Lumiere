"use server";

import { deleteProduct2ById } from "@/data-access/product2";

export const deleteProductById = async (productId: string) => {
  await deleteProduct2ById(productId);
};
