import { PasswordResetToken, Prisma } from "@prisma/client";
import { prisma } from "@/modules/shared/core/db/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IPasswordResetTokenRepository,
  PasswordResetTokenResponse,
  PasswordResetTokenCreateInput,
  PasswordResetTokenUpdateInput,
} from "./types";

export class PasswordResetTokenRepository
  implements IPasswordResetTokenRepository
{
  // doing nothing here, just a placeholder
  //TODO: clean up in general, probably not needed here
  private removePrivateFields(
    passwordResetToken: PasswordResetToken,
  ): PasswordResetTokenResponse {
    const { id, ...passwordResetTokenResponse } = passwordResetToken;
    return { ...passwordResetTokenResponse, id };
  }

  async findById(id: string): Promise<PasswordResetTokenResponse | null> {
    try {
      const passwordResetToken = await prisma.passwordResetToken.findUnique({
        where: { id },
      });
      return passwordResetToken
        ? this.removePrivateFields(passwordResetToken)
        : null;
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch password reset token by id",
        error,
      );
    }
  }

  async findByToken(token: string): Promise<PasswordResetTokenResponse | null> {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken
      ? this.removePrivateFields(passwordResetToken)
      : null;
  }

  async findAll(): Promise<PasswordResetTokenResponse[]> {
    try {
      const passwordResetTokens = await prisma.passwordResetToken.findMany();
      return passwordResetTokens.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch all password reset tokens",
        error,
      );
    }
  }

  async create(
    data: PasswordResetTokenCreateInput,
  ): Promise<PasswordResetTokenResponse> {
    try {
      const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(passwordResetToken);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "PasswordResetToken",
            field,
            data[field as keyof PasswordResetTokenCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create password reset token", error);
    }
  }

  async update(
    id: string,
    data: PasswordResetTokenUpdateInput,
  ): Promise<PasswordResetTokenResponse> {
    try {
      const passwordResetToken = await prisma.passwordResetToken.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(passwordResetToken);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
          throw new NotFoundError("PasswordResetToken", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "PasswordResetToken",
            field,
            data[field as keyof PasswordResetTokenUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update password reset token", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.passwordResetToken.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("PasswordResetToken", id);
        }
      }
      throw new RepositoryError("Failed to delete password reset token", error);
    }
  }
}
