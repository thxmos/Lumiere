"use server";

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
