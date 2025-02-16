import { LinkGroup, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type LinkGroupCreateInput = Prisma.LinkGroupCreateInput;

export type LinkGroupUpdateDto = LinkGroup & { id: string };
export type LinkGroupUpdateInput = Prisma.LinkGroupUpdateInput;
export type LinkGroupWhereInput = Prisma.LinkGroupWhereInput;

export type LinkGroupResponse = LinkGroup;

export type LinkGroupWithLinks = Prisma.LinkGroupGetPayload<{
  include: { Links: true };
}>;

export type LinkGroupWithLinksTheme = Prisma.LinkGroupGetPayload<{
  include: { Links: true; Theme: true };
}>;

export type LinkGroupCreateDto = {
  title?: string;
  description?: string;
  userId: string;
};

export interface ILinkGroupRepository
  extends IBaseRepository<
    LinkGroupResponse,
    LinkGroupCreateDto,
    LinkGroupUpdateInput
  > {
  findById(id: string): Promise<LinkGroupResponse | null>;
  findAll(): Promise<LinkGroupResponse[]>;
  create(data: LinkGroupCreateInput): Promise<LinkGroupResponse>;
  update(id: string, data: LinkGroupUpdateInput): Promise<LinkGroupResponse>;
  delete(id: string): Promise<void>;
}
