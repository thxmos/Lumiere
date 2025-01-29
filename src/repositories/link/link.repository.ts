import { Link, Prisma, User } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  ILinkRepository,
  LinkResponse,
  LinkCreateInput,
  LinkUpdateInput,
} from "./types";

export class LinkRepository implements ILinkRepository {
  private removePrivateFields(link: Link): LinkResponse {
    const { id, ...linkResponse } = link;
    return linkResponse;
  }

  async findById(id: string): Promise<LinkResponse | null> {
    try {
      const link = await prisma.link.findUnique({ where: { id } });
      return link ? this.removePrivateFields(link) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch link by id", error);
    }
  }

  async findAll(): Promise<LinkResponse[]> {
    try {
      const links = await prisma.link.findMany();
      return links.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all links", error);
    }
  }

  async create(data: LinkCreateInput): Promise<LinkResponse> {
    try {
      const link = await prisma.link.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(link);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Link",
            field,
            data[field as keyof LinkCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create link", error);
    }
  }

  async update(id: string, data: LinkUpdateInput): Promise<LinkResponse> {
    try {
      const link = await prisma.link.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(link);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Link", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Link",
            field,
            data[field as keyof LinkUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update link", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.link.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Link", id);
        }
      }
      throw new RepositoryError("Failed to delete link", error);
    }
  }
}
