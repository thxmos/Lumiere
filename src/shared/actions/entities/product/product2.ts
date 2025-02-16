"use server";

import { CreateProduct2Dto } from "@/shared/types/entities/product2";
import { prisma } from "@/shared/core/db/prisma";
import { Product2Dto } from "@/shared/types/entities/product2";
import { Product2 } from "@prisma/client";
import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/utils/security/auth";

function toDtoMapper(product: Product2): Product2Dto {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    imageId: product.imageId,
    active: product.active,
    price: product.price ? Number.parseFloat(product.price.toString()) : null,
    isPwyc: product.isPwyc,
    userId: product.userId,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

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

export async function createProduct(
  userId: string,
  data: CreateProduct2Dto,
): Promise<Product2Dto> {
  const createdProduct = await prisma.product2.create({
    data: {
      ...data,
      userId: userId,
    },
  });
  return toDtoMapper(createdProduct);
}

export async function getProductsByUserId(
  userId: string,
): Promise<Product2Dto[]> {
  const products = await prisma.product2.findMany({ where: { userId } });
  return products.map(toDtoMapper);
}

export async function getProductById(productId: string): Promise<Product2Dto> {
  const product = await prisma.product2.findUnique({
    where: { id: productId },
  });
  if (!product) {
    throw new Error("Product not found with id: " + productId);
  }
  return toDtoMapper(product);
}

// export async function getProducts(): Promise<Product2Dto[]> {
//   const products = await prisma.product2.findMany();
//   return products.map(toDtoMapper);
// }

export async function updateProductById(
  id: string,
  data: Partial<Product2Dto>,
): Promise<void> {
  await prisma.product2.update({ where: { id }, data });
}

// export async function getProduct2ById(id: string): Promise<Product2Dto> {
//   const foundProduct = await prisma.product2.findUnique({
//     where: { id },
//   });
//   if (!foundProduct) {
//     throw new Error("Product2 not found with id: " + id);
//   }
//   return toDtoMapper(foundProduct);
// }

// export async function updateProduct2ById(
//   id: string,
//   data: Partial<Product2>,
// ): Promise<void> {
//   await prisma.product2.update({ where: { id }, data });
// }

export async function deleteProduct2ById(id: string): Promise<void> {
  await prisma.product2.delete({ where: { id } });
}

export const createNewProduct = withAuth(
  async (user: SessionUser, product: CreateProduct2Dto) => {
    await createProduct(user.id, product);
  },
);

export const getProducts = withAuth(async (user: SessionUser) => {
  return await getProductsByUserId(user.id);
});

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
