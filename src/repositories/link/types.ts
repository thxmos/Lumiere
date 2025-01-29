import { Link, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type LinkCreateInput = Prisma.LinkCreateInput;
export type LinkUpdateInput = Prisma.LinkUpdateInput;
export type LinkWhereInput = Prisma.LinkWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type LinkResponse = Omit<Link, "id">;

export interface ILinkRepository
  extends IBaseRepository<LinkResponse, LinkCreateInput, LinkUpdateInput> {
  findById(id: string): Promise<LinkResponse | null>;
  findAll(): Promise<LinkResponse[]>;
  create(data: LinkCreateInput): Promise<LinkResponse>;
  update(id: string, data: LinkUpdateInput): Promise<LinkResponse>;
  delete(id: string): Promise<void>;
}
