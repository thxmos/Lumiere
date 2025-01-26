import { Product2 } from "@prisma/client";

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

export type Product2DtoWithId = Product2;
