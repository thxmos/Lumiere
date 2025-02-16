import { Click, Prisma, VerificationToken } from "@prisma/client";
import { IBaseRepository } from "../types";

export type VerificationTokenCreateInput = Prisma.VerificationTokenCreateInput;
export type VerificationTokenUpdateInput = Prisma.VerificationTokenUpdateInput;
export type VerificationTokenWhereInput = Prisma.VerificationTokenWhereInput;

export type VerificationTokenResponse = Omit<VerificationToken, "id">;

export interface IVerificationTokenRepository
  extends IBaseRepository<
    VerificationTokenResponse,
    VerificationTokenCreateInput,
    VerificationTokenUpdateInput
  > {
  findById(id: string): Promise<VerificationTokenResponse | null>;
  findAll(): Promise<VerificationTokenResponse[]>;
  create(
    data: VerificationTokenCreateInput,
  ): Promise<VerificationTokenResponse>;
  update(
    id: string,
    data: VerificationTokenUpdateInput,
  ): Promise<VerificationTokenResponse>;
  delete(id: string): Promise<void>;
}
