import { Prisma, User } from "@prisma/client";
import { prisma } from "@/shared/core/db/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  IUserRepository,
  UserResponse,
  UserCreateInput,
  UserUpdateInput,
} from "./types";

export class UserRepository implements IUserRepository {
  private removePrivateFields(user: User): UserResponse {
    const { password, ...userResponse } = user; //TODO: stripeCustomerId
    return userResponse;
  }

  async findById(id: string): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user ? this.removePrivateFields(user) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch user by id", error);
    }
  }

  async findByUsername(username: string): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      return user ? this.removePrivateFields(user) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch user by username", error);
    }
  }

  async findAll(): Promise<UserResponse[]> {
    try {
      const users = await prisma.user.findMany();
      return users.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all users", error);
    }
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      return user ? this.removePrivateFields(user) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch user by email", error);
    }
  }

  async create(data: UserCreateInput): Promise<UserResponse> {
    try {
      const user = await prisma.user.create({
        data: {
          ...data,
          email: data.email.toLowerCase(),
        },
      });
      return this.removePrivateFields(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "User",
            field,
            data[field as keyof UserCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create user", error);
    }
  }

  async update(id: string, data: UserUpdateInput): Promise<UserResponse> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "User",
            field,
            data[field as keyof UserUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update user", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("User", id);
        }
      }
      throw new RepositoryError("Failed to delete user", error);
    }
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("User", id);
      }
      throw new RepositoryError("Failed to update password", error);
    }
  }

  async verifyEmail(id: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id },
        data: { isVerified: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("User", id);
        }
      }
      throw new RepositoryError("Failed to verify email", error);
    }
  }

  //TODO: make private or remove
  async generateUsername(email: string): Promise<string> {
    const baseUsername = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (!existingUser) break;
      username = `${baseUsername}${counter++}`;
    }

    return username;
  }
}
