import { Asset, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type AssetCreateInput = Omit<
  Prisma.AssetCreateInput,
  "url" | "userId"
> & {
  url?: string;
};
export type AssetUpdateInput = Prisma.AssetUpdateInput;
export type AssetWhereInput = Prisma.AssetWhereInput;

export type AssetResponse = Omit<Asset, "userId">;

export interface IAssetRepository
  extends IBaseRepository<AssetResponse, AssetCreateInput, AssetUpdateInput> {
  findById(id: string): Promise<AssetResponse | null>;
  findAll(): Promise<AssetResponse[]>;
  create(data: AssetCreateInput): Promise<AssetResponse>;
  update(id: string, data: AssetUpdateInput): Promise<AssetResponse>;
  delete(id: string): Promise<void>;
}
