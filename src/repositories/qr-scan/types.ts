import { Prisma, QRScan } from "@prisma/client";
import { IBaseRepository } from "../types";

export type QRScanCreateInput = Prisma.QRScanCreateInput;
export type QRScanUpdateInput = Prisma.QRScanUpdateInput;
export type QRScanWhereInput = Prisma.QRScanWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type QRScanResponse = Omit<QRScan, "id">;

export interface IQRScanRepository
  extends IBaseRepository<
    QRScanResponse,
    QRScanCreateInput,
    QRScanUpdateInput
  > {
  findById(id: string): Promise<QRScanResponse | null>;
  findAll(): Promise<QRScanResponse[]>;
  create(data: QRScanCreateInput): Promise<QRScanResponse>;
  update(id: string, data: QRScanUpdateInput): Promise<QRScanResponse>;
  delete(id: string): Promise<void>;
}
