import { Link, Prisma } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  ILinkRepository,
  LinkResponse,
  LinkCreateInput,
  LinkUpdateInput,
  LinkCreateManyInput,
} from "./types";
import { SessionUser } from "@/utils/lib/lucia";

export class LinkRepository implements ILinkRepository {
  // TODO: fix removePrivateFields
  private removePrivateFields(link: Link): LinkResponse {
    const { /*id,*/ ...linkResponse } = link; // TODO: id or no?
    return linkResponse as LinkResponse;
  }

  async findById(id: string): Promise<LinkResponse | null> {
    try {
      const link = await prisma.link.findUnique({ where: { id } });
      return link ? this.removePrivateFields(link) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch link by id", error);
    }
  }

  async getLinksByUserId(userId: string): Promise<LinkResponse[]> {
    try {
      const linkGroups = await prisma.linkGroup.findMany({
        where: {
          userId: userId,
        },
        include: {
          links: true,
        },
      });

      return linkGroups.flatMap((group) =>
        group.links.map(this.removePrivateFields),
      );
    } catch (error) {
      throw new RepositoryError("Failed to fetch links by user id", error);
    }
  }

  async getLinksByGroupId(groupId: string): Promise<LinkResponse[]> {
    try {
      const links = await prisma.link.findMany({
        where: {
          linkGroupId: groupId,
        },
      });

      return links.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch links by group id", error);
    }
  }

  async getActiveLinksByUsername(username: string): Promise<LinkResponse[]> {
    try {
      const linkGroups = await prisma.linkGroup.findMany({
        where: {
          user: { username },
        },
        include: {
          links: true,
        },
      });

      return linkGroups.flatMap((group) =>
        group.links.map(this.removePrivateFields),
      );
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch active links by username",
        error,
      );
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

  async createMany(
    user: SessionUser,
    data: LinkCreateManyInput[],
    linkGroupId: string,
  ): Promise<void> {
    try {
      await prisma.link.createMany({
        data: data.map((link) => ({
          ...link,
          linkGroupId,
        })),
      });
    } catch (error) {
      throw new RepositoryError("Failed to create links", error);
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

  // TODO: fix updateMany
  async updateMany(user: SessionUser, data: LinkUpdateInput[]): Promise<void> {
    try {
      data.forEach(async (link) => {
        await this.update(link.id as string, link);
      });
    } catch (error) {
      console.error("Failed to update links", error);
      throw new RepositoryError("Failed to update links", error);
    }
    // try {
    //   await prisma.link.updateMany({
    //     where: { userId: user.id },
    //     data,
    //   });
    // } catch (error) {
    //   throw new RepositoryError("Failed to update links", error);
    // }
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
