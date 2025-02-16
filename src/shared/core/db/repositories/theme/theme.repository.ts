import { Prisma, Theme } from "@prisma/client";
import { prisma } from "@/shared/core/db/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IThemeRepository,
  ThemeResponse,
  ThemeCreateInput,
  ThemeUpdateInput,
} from "./types";

export class ThemeRepository implements IThemeRepository {
  private removePrivateFields(theme: Theme): ThemeResponse {
    // const { linkGroupId, ...themeResponse } = theme;
    return theme;
  }

  async findById(id: string): Promise<ThemeResponse | null> {
    try {
      const theme = await prisma.theme.findUnique({
        where: { linkGroupId: id },
      });
      return theme ? this.removePrivateFields(theme) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch theme by id", error);
    }
  }

  async findAll(): Promise<ThemeResponse[]> {
    try {
      const themes = await prisma.theme.findMany();
      return themes.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all themes", error);
    }
  }

  async create(data: ThemeCreateInput): Promise<ThemeResponse> {
    try {
      const theme = await prisma.theme.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(theme);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Theme",
            field,
            data[field as keyof ThemeCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create theme", error);
    }
  }

  async update(id: string, data: ThemeUpdateInput): Promise<ThemeResponse> {
    try {
      const theme = await prisma.theme.update({
        where: { linkGroupId: id },
        data,
      });
      return this.removePrivateFields(theme);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Theme", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Theme",
            field,
            data[field as keyof ThemeUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update theme", error);
    }
  }

  async delete(linkGroupId: string): Promise<void> {
    try {
      await prisma.theme.delete({
        where: { linkGroupId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Theme", linkGroupId);
        }
      }
      throw new RepositoryError("Failed to delete theme", error);
    }
  }
}
