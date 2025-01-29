import { Prisma, User } from "@prisma/client";
import { IBaseRepository } from "../types";

export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereInput = Prisma.UserWhereInput;

// For responses, we can omit sensitive fields from Prisma's User type
export type UserResponse = Omit<User, "password" | "stripeCustomerId">;

export interface IUserRepository
  extends IBaseRepository<UserResponse, UserCreateInput, UserUpdateInput> {
  findById(id: string): Promise<UserResponse | null>;
  findByEmail(email: string): Promise<UserResponse | null>;
  create(data: UserCreateInput): Promise<UserResponse>;
  update(id: string, data: UserUpdateInput): Promise<UserResponse>;
  delete(id: string): Promise<void>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  verifyEmail(id: string): Promise<void>;
  generateUsername(email: string): Promise<string>;
}
