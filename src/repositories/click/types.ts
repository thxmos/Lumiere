import { Click, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type ClickCreateInput = Prisma.ClickCreateInput;
export type ClickUpdateInput = Prisma.ClickUpdateInput;
export type ClickWhereInput = Prisma.ClickWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type ClickResponse = Omit<Click, "id">;

export interface IClickRepository
  extends IBaseRepository<ClickResponse, ClickCreateInput, ClickUpdateInput> {
  findById(id: string): Promise<ClickResponse | null>;
  findAll(): Promise<ClickResponse[]>;
  create(data: ClickCreateInput): Promise<ClickResponse>;
  update(id: string, data: ClickUpdateInput): Promise<ClickResponse>;
  delete(id: string): Promise<void>;
}
