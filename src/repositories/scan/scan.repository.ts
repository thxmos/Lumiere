import { Image as Asset, Prisma, Scan } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IScanRepository,
  ScanResponse,
  ScanCreateInput,
  ScanUpdateInput,
} from "./types";

export class ScanRepository implements IScanRepository {
  private removePrivateFields(scan: Scan): ScanResponse {
    const { id, ...scanResponse } = scan;
    return { ...scanResponse };
  }

  async findById(id: string): Promise<ScanResponse | null> {
    try {
      const scan = await prisma.scan.findUnique({ where: { id } });
      return scan ? this.removePrivateFields(scan) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch scan by id", error);
    }
  }

  async findAll(): Promise<ScanResponse[]> {
    try {
      const scans = await prisma.scan.findMany();
      return scans.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all scans", error);
    }
  }

  async getAllByQrId(qrId: string): Promise<ScanResponse[]> {
    try {
      const scans = await prisma.scan.findMany({ where: { qrId } });
      return scans.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch scans by qr id", error);
    }
  }

  async create(data: ScanCreateInput): Promise<ScanResponse> {
    try {
      const scan = await prisma.scan.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(scan);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Scan",
            field,
            data[field as keyof ScanCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create scan", error);
    }
  }

  async update(id: string, data: ScanUpdateInput): Promise<ScanResponse> {
    try {
      const scan = await prisma.scan.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(scan);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Scan", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Scan",
            field,
            data[field as keyof ScanUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update scan", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.scan.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Scan", id);
        }
      }
      throw new RepositoryError("Failed to delete scan", error);
    }
  }
}
