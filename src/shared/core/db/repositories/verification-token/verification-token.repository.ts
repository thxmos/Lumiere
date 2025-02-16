import { Prisma, VerificationToken } from "@prisma/client";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IVerificationTokenRepository,
  VerificationTokenResponse,
  VerificationTokenCreateInput,
  VerificationTokenUpdateInput,
} from "./types";
import { prisma } from "../../prisma";

export class VerificationTokenRepository
  implements IVerificationTokenRepository
{
  private removePrivateFields(
    verificationToken: VerificationToken,
  ): VerificationTokenResponse {
    const { id, ...verificationTokenResponse } = verificationToken;
    return verificationTokenResponse;
  }

  async findById(id: string): Promise<VerificationTokenResponse | null> {
    try {
      const verificationToken = await prisma.verificationToken.findUnique({
        where: { id },
      });
      return verificationToken
        ? this.removePrivateFields(verificationToken)
        : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch click by id", error);
    }
  }

  async findAll(): Promise<VerificationTokenResponse[]> {
    try {
      const verificationTokens = await prisma.verificationToken.findMany();
      return verificationTokens.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all clicks", error);
    }
  }

  async create(
    data: VerificationTokenCreateInput,
  ): Promise<VerificationTokenResponse> {
    try {
      const verificationToken = await prisma.verificationToken.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(verificationToken);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "VerificationToken",
            field,
            data[field as keyof VerificationTokenCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create click", error);
    }
  }

  async update(
    id: string,
    data: VerificationTokenUpdateInput,
  ): Promise<VerificationTokenResponse> {
    try {
      const verificationToken = await prisma.verificationToken.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(verificationToken);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
          throw new NotFoundError("VerificationToken", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "VerificationToken",
            field,
            data[field as keyof VerificationTokenUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update click", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.verificationToken.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("VerificationToken", id);
        }
      }
      throw new RepositoryError("Failed to delete verification token", error);
    }
  }
}
