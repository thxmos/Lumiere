import { Prisma, Product2 } from "@prisma/client";
import { IBaseRepository } from "../types";

export type ProductCreateInput = Prisma.Product2CreateInput;
export type ProductUpdateInput = Prisma.Product2UpdateInput;
export type ProductWhereInput = Prisma.Product2WhereInput;

// TODO: do we want to exclude id from ThemeResponse?
export type ProductResponse = Omit<Product2, "id">;

export interface IProductRepository
  extends IBaseRepository<
    ProductResponse,
    ProductCreateInput,
    ProductUpdateInput
  > {
  findById(id: string): Promise<ProductResponse | null>;
  findAll(): Promise<ProductResponse[]>;
  create(data: ProductCreateInput): Promise<ProductResponse>;
  update(id: string, data: ProductUpdateInput): Promise<ProductResponse>;
  delete(id: string): Promise<void>;
}
