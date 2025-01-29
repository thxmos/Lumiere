import { Prisma, Product2 } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IProductRepository,
  ProductResponse,
  ProductCreateInput,
  ProductUpdateInput,
} from "./types";

export class ProductRepository implements IProductRepository {
  private removePrivateFields(product: Product2): ProductResponse {
    const { id, ...productResponse } = product;
    return productResponse;
  }

  async findById(id: string): Promise<ProductResponse | null> {
    try {
      const product = await prisma.product2.findUnique({ where: { id } });
      return product ? this.removePrivateFields(product) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch product by id", error);
    }
  }

  async findAll(): Promise<ProductResponse[]> {
    try {
      const products = await prisma.product2.findMany();
      return products.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all products", error);
    }
  }

  async create(data: ProductCreateInput): Promise<ProductResponse> {
    try {
      const product = await prisma.product2.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Product",
            field,
            data[field as keyof ProductCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create product", error);
    }
  }

  async update(id: string, data: ProductUpdateInput): Promise<ProductResponse> {
    try {
      const product = await prisma.product2.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(product);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Product", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Product",
            field,
            data[field as keyof ProductUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update product", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.product2.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Product", id);
        }
      }
      throw new RepositoryError("Failed to delete product", error);
    }
  }
}
