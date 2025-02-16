import { Prisma, QRScan } from "@prisma/client";
import { prisma } from "@/shared/core/db/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IQRScanRepository,
  QRScanResponse,
  QRScanCreateInput,
  QRScanUpdateInput,
} from "./types";

export class QRScanRepository implements IQRScanRepository {
  private removePrivateFields(scan: QRScan): QRScanResponse {
    const { id, ...scanResponse } = scan;
    return { ...scanResponse };
  }

  async findById(id: string): Promise<QRScanResponse | null> {
    try {
      const scan = await prisma.qRScan.findUnique({ where: { id } });
      return scan ? this.removePrivateFields(scan) : null;
    } catch (error) {
      throw new RepositoryError(`Failed to fetch scan with id: ${id}`, error);
    }
  }

  async findAll(): Promise<QRScanResponse[]> {
    try {
      const scans = await prisma.qRScan.findMany();
      return scans.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all scans", error);
    }
  }

  async getAllByQrId(qrId: string): Promise<QRScanResponse[]> {
    try {
      const scans = await prisma.qRScan.findMany({ where: { qrId } });
      return scans.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError(
        `Failed to fetch scans by qr id: ${qrId}`,
        error,
      );
    }
  }

  async getAllByUserId(userId: string): Promise<QRScan[]> {
    try {
      const scans = await prisma.qRScan.findMany({
        where: { qrCode: { userId } },
      });
      // return scans.map(this.removePrivateFields); TODO: maybe shouldnt leak id
      return scans;
    } catch (error) {
      throw new RepositoryError(
        `Failed to fetch scans for user: ${userId}`,
        error,
      );
    }
  }

  async create(data: QRScanCreateInput): Promise<QRScanResponse> {
    try {
      const scan = await prisma.qRScan.create({
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
            data[field as keyof QRScanCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create scan", error);
    }
  }

  async update(id: string, data: QRScanUpdateInput): Promise<QRScanResponse> {
    try {
      const scan = await prisma.qRScan.update({
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
            data[field as keyof QRScanUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update scan", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.qRScan.delete({
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
