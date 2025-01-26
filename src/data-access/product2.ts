import { prisma } from "@/utils/prisma";
import type { Product2 } from "@prisma/client";

export type CreateProduct2Dto = {
  name?: string;
  description?: string;
  imageId?: string;
  active?: boolean;
  price?: number;
  isPwyc?: boolean;
};

export type Product2Dto = {
  id: string;
  name: string | null;
  description: string | null;
  imageId: string | null;
  active: boolean | null;
  price: number | null;
  isPwyc: boolean | null;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
};

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
