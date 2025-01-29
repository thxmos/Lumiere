import { Click, Prisma } from "@prisma/client";
import { prisma } from "@/utils/lib/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IClickRepository,
  ClickResponse,
  ClickCreateInput,
  ClickUpdateInput,
} from "./types";

export class ClickRepository implements IClickRepository {
  private removePrivateFields(click: Click): ClickResponse {
    const { id, ...clickResponse } = click;
    return clickResponse;
  }

  async findById(id: string): Promise<ClickResponse | null> {
    try {
      const click = await prisma.click.findUnique({ where: { id } });
      return click ? this.removePrivateFields(click) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch click by id", error);
    }
  }

  async findAll(): Promise<ClickResponse[]> {
    try {
      const clicks = await prisma.click.findMany();
      return clicks.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all clicks", error);
    }
  }

  async create(data: ClickCreateInput): Promise<ClickResponse> {
    try {
      const click = await prisma.click.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(click);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Click",
            field,
            data[field as keyof ClickCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create click", error);
    }
  }

  async update(id: string, data: ClickUpdateInput): Promise<ClickResponse> {
    try {
      const click = await prisma.click.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(click);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Click", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Click",
            field,
            data[field as keyof ClickUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update click", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.click.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Click", id);
        }
      }
      throw new RepositoryError("Failed to delete click", error);
    }
  }
}
