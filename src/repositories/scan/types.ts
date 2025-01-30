import { Image, Prisma, Scan } from "@prisma/client";
import { IBaseRepository } from "../types";

export type ScanCreateInput = Prisma.ScanCreateInput;
export type ScanUpdateInput = Prisma.ScanUpdateInput;
export type ScanWhereInput = Prisma.ScanWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type ScanResponse = Omit<Scan, "id">;

export interface IScanRepository
  extends IBaseRepository<ScanResponse, ScanCreateInput, ScanUpdateInput> {
  findById(id: string): Promise<ScanResponse | null>;
  findAll(): Promise<ScanResponse[]>;
  create(data: ScanCreateInput): Promise<ScanResponse>;
  update(id: string, data: ScanUpdateInput): Promise<ScanResponse>;
  delete(id: string): Promise<void>;
}
