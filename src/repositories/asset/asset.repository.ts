import { Asset, Prisma } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IAssetRepository,
  AssetResponse,
  AssetCreateInput,
  AssetUpdateInput,
} from "./types";

export class AssetRepository implements IAssetRepository {
  private removePrivateFields(asset: Asset): AssetResponse {
    const { userId, ...assetResponse } = asset;
    return { ...assetResponse };
  }

  async findById(id: string): Promise<AssetResponse | null> {
    try {
      const asset = await prisma.asset.findUnique({ where: { id } });
      return asset ? this.removePrivateFields(asset) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch asset by id", error);
    }
  }

  async findAll(): Promise<AssetResponse[]> {
    try {
      const assets = await prisma.asset.findMany();
      return assets.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all assets", error);
    }
  }

  async getAllByUserId(userId: string): Promise<AssetResponse[]> {
    try {
      const assets = await prisma.asset.findMany({ where: { userId } });
      return assets.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch assets by user id", error);
    }
  }

  async create(data: AssetCreateInput): Promise<AssetResponse> {
    try {
      const asset = await prisma.asset.create({
        data: {
          ...data,
          url: data.url!,
        },
      });
      return this.removePrivateFields(asset);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Asset",
            field,
            data[field as keyof AssetCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create asset", error);
    }
  }

  async update(id: string, data: AssetUpdateInput): Promise<AssetResponse> {
    try {
      const asset = await prisma.asset.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(asset);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Asset", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Asset",
            field,
            data[field as keyof AssetUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update asset", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.asset.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Asset", id);
        }
      }
      throw new RepositoryError("Failed to delete asset", error);
    }
  }
}
