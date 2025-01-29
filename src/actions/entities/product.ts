"use server";

import { deleteProduct2ById } from "@/actions/entities/product2";
import { prisma } from "@/utils/lib/prisma";
import { Prisma, Product } from "@prisma/client";
import { cache } from "react";

export const deleteProductById = async (productId: string) => {
  await deleteProduct2ById(productId);
};

export const createProduct = async (
  options: Prisma.ProductCreateArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    await prisma.product.create({
      ...options,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create product", error);
    return { error: "Failed to create user" };
  }
};

export const findProducts = cache(
  async (
    options?: Prisma.ProductFindManyArgs,
  ): Promise<{ products: Product[]; error?: string }> => {
    try {
      const foundProducts = await prisma.product.findMany({ ...options });
      return { products: foundProducts };
    } catch (error) {
      console.error(`Failed to find products`, error);
      return { products: [], error: "Failed to fetch products" };
    }
  },
);

export const deleteProduct = async (
  options: Prisma.ProductDeleteArgs,
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const deletedProduct = await prisma.product.delete({
      ...options,
    });
    if (!deletedProduct) return { error: "Product not found" };
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete product" };
  }
};

export async function deleteProductByStripeProductId(
  stripeProductId: string,
): Promise<void> {
  await prisma.product.delete({ where: { stripeProductId } });
}
