import { LinkGroup } from "@prisma/client";
import {
  ILinkGroupRepository,
  LinkGroupCreateDto,
  LinkGroupCreateInput,
  LinkGroupResponse,
} from "./types";
import { RepositoryError } from "../errors";
import { prisma } from "@/utils/lib/prisma";

export class LinkGroupRepository implements ILinkGroupRepository {
  private removePrivateFields(linkGroup: LinkGroup): LinkGroupResponse {
    const { ...linkGroupResponse } = linkGroup;
    return linkGroupResponse as LinkGroupResponse;
  }

  async findById(id: string): Promise<LinkGroupResponse | null> {
    try {
      const linkGroup = await prisma.linkGroup.findUnique({
        where: { id },
      });
      return linkGroup ? this.removePrivateFields(linkGroup) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch link group by id", error);
    }
  }

  async findByUserId(userId: string): Promise<LinkGroupResponse[]> {
    try {
      const linkGroups = await prisma.linkGroup.findMany({
        where: { userId },
      });
      return linkGroups.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch link groups by user id",
        error,
      );
    }
  }

  async findAll(): Promise<LinkGroupResponse[]> {
    try {
      const linkGroups = await prisma.linkGroup.findMany();
      return linkGroups.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all link groups", error);
    }
  }

  async create(data: LinkGroupCreateDto): Promise<LinkGroupResponse> {
    try {
      const linkGroup = await prisma.linkGroup.create({
        data: {
          name: data.name,
          description: data.description,
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      });
      return this.removePrivateFields(linkGroup);
    } catch (error) {
      throw new RepositoryError("Failed to create link", error);
    }
  }

  async update(
    id: string,
    data: Partial<LinkGroupCreateInput>,
  ): Promise<LinkGroupResponse> {
    try {
      const linkGroup = await prisma.linkGroup.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(linkGroup);
    } catch (error) {
      throw new RepositoryError("Failed to update link group", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.linkGroup.delete({
        where: { id },
      });
    } catch (error) {
      throw new RepositoryError("Failed to delete link group", error);
    }
  }
}
