import { Image, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type AssetCreateInput = Omit<
  Prisma.ImageCreateInput,
  "url" | "userId"
> & {
  url?: string;
};
export type AssetUpdateInput = Prisma.ImageUpdateInput;
export type AssetWhereInput = Prisma.ImageWhereInput;

export type AssetResponse = Omit<Image, "userId">;

export interface IAssetRepository
  extends IBaseRepository<AssetResponse, AssetCreateInput, AssetUpdateInput> {
  findById(id: string): Promise<AssetResponse | null>;
  findAll(): Promise<AssetResponse[]>;
  create(data: AssetCreateInput): Promise<AssetResponse>;
  update(id: string, data: AssetUpdateInput): Promise<AssetResponse>;
  delete(id: string): Promise<void>;
}
