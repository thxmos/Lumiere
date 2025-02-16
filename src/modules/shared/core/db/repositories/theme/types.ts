import { Prisma, Theme } from "@prisma/client";
import { IBaseRepository } from "../types";

export type ThemeCreateInput = Prisma.ThemeCreateInput;
export type ThemeUpdateInput = Prisma.ThemeUpdateInput;
export type ThemeWhereInput = Prisma.ThemeWhereInput;

// TODO: do we want to exclude id from ThemeResponse?
export type ThemeResponse = Omit<Theme, "id">;

export interface IThemeRepository
  extends IBaseRepository<ThemeResponse, ThemeCreateInput, ThemeUpdateInput> {
  findById(id: string): Promise<ThemeResponse | null>;
  findAll(): Promise<ThemeResponse[]>;
  create(data: ThemeCreateInput): Promise<ThemeResponse>;
  update(id: string, data: ThemeUpdateInput): Promise<ThemeResponse>;
  delete(id: string): Promise<void>;
}
