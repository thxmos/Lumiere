import { Prisma, QRCode } from "@prisma/client";
import { IBaseRepository } from "../types";

export type QrCodeCreateInput = Prisma.QRCodeCreateInput;
export type QrCodeUpdateInput = Prisma.QRCodeUpdateInput;
export type QrCodeWhereInput = Prisma.QRCodeWhereInput;

// TODO: do we want to exclude id from ThemeResponse?
export type QrCodeResponse = QRCode;

export interface IQrCodeRepository
  extends IBaseRepository<
    QrCodeResponse,
    QrCodeCreateInput,
    QrCodeUpdateInput
  > {
  findById(id: string): Promise<QrCodeResponse | null>;
  findAll(): Promise<QrCodeResponse[]>;
  create(data: QrCodeCreateInput): Promise<QrCodeResponse>;
  update(id: string, data: QrCodeUpdateInput): Promise<QrCodeResponse>;
  delete(id: string): Promise<void>;
}
