import { PasswordResetToken, Prisma } from "@prisma/client";
import { IBaseRepository } from "../types";

export type PasswordResetTokenCreateInput =
  Prisma.PasswordResetTokenCreateInput;
export type PasswordResetTokenUpdateInput =
  Prisma.PasswordResetTokenUpdateInput;
export type PasswordResetTokenWhereInput = Prisma.PasswordResetTokenWhereInput;

export type PasswordResetTokenResponse = PasswordResetToken;

export interface IPasswordResetTokenRepository
  extends IBaseRepository<
    PasswordResetTokenResponse,
    PasswordResetTokenCreateInput,
    PasswordResetTokenUpdateInput
  > {
  findById(id: string): Promise<PasswordResetTokenResponse | null>;
  findAll(): Promise<PasswordResetTokenResponse[]>;
  create(
    data: PasswordResetTokenCreateInput,
  ): Promise<PasswordResetTokenResponse>;
  update(
    id: string,
    data: PasswordResetTokenUpdateInput,
  ): Promise<PasswordResetTokenResponse>;
  delete(id: string): Promise<void>;
}
