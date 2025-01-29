import { Image, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type AssetCreateInput = Prisma.ImageCreateInput;
export type AssetUpdateInput = Prisma.ImageUpdateInput;
export type AssetWhereInput = Prisma.ImageWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type AssetResponse = Omit<Image, "id">;

export interface IAssetRepository
  extends IBaseRepository<AssetResponse, AssetCreateInput, AssetUpdateInput> {
  findById(id: string): Promise<AssetResponse | null>;
  findAll(): Promise<AssetResponse[]>;
  create(data: AssetCreateInput): Promise<AssetResponse>;
  update(id: string, data: AssetUpdateInput): Promise<AssetResponse>;
  delete(id: string): Promise<void>;
}
