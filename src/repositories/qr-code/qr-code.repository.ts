import { Prisma, QRCode } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IQrCodeRepository,
  QrCodeResponse,
  QrCodeCreateInput,
  QrCodeUpdateInput,
} from "./types";

export class QrCodeRepository implements IQrCodeRepository {
  private removePrivateFields(qrCode: QRCode): QrCodeResponse {
    const { id, ...qrCodeResponse } = qrCode;
    return qrCodeResponse;
  }

  async findById(id: string): Promise<QrCodeResponse | null> {
    try {
      const qrCode = await prisma.qRCode.findUnique({ where: { id } });
      return qrCode ? this.removePrivateFields(qrCode) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch QR Code by id", error);
    }
  }

  async findAll(): Promise<QrCodeResponse[]> {
    try {
      const qrCodes = await prisma.qRCode.findMany();
      return qrCodes.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all QRCodes", error);
    }
  }

  async create(data: QrCodeCreateInput): Promise<QrCodeResponse> {
    try {
      const qrCode = await prisma.qRCode.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(qrCode);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "QRCode",
            field,
            data[field as keyof QrCodeCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create QR Code", error);
    }
  }

  async update(id: string, data: QrCodeUpdateInput): Promise<QrCodeResponse> {
    try {
      const qrCode = await prisma.qRCode.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(qrCode);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("QRCode", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "QRCode",
            field,
            data[field as keyof QrCodeUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update QR Code", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.qRCode.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("QRCode", id);
        }
      }
      throw new RepositoryError("Failed to delete QR Code", error);
    }
  }
}
