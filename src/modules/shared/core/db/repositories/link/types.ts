import { Link, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type LinkCreateInput = Omit<Prisma.LinkCreateInput, "Click">; // don't want to be able to create a click
export type LinkCreateManyInput = Prisma.LinkCreateManyInput;
export type LinkUpdateDto = Link & { id: string };
export type LinkUpdateInput = Prisma.LinkUpdateInput;
export type LinkWhereInput = Prisma.LinkWhereInput;

// TODO: do we want to exclude link from LinkResponse?
export type LinkResponse = Link;

export interface ILinkRepository
  extends IBaseRepository<LinkResponse, LinkCreateInput, LinkUpdateInput> {
  findById(id: string): Promise<LinkResponse | null>;
  findAll(): Promise<LinkResponse[]>;
  create(data: LinkCreateInput): Promise<LinkResponse>;
  update(id: string, data: LinkUpdateInput): Promise<LinkResponse>;
  delete(id: string): Promise<void>;
}
