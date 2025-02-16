"use server";

import { prisma } from "@/modules/shared/core/db/prisma";
import { User } from "@prisma/client";

export type CreateUserDto = {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
};

export type UserDto = User;

export type UserDtoNoId = Omit<UserDto, "id" | "stripeCustomerId">;

export async function toDtoMapper(user: User): Promise<UserDto> {
  return user;
}

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const createdUser = await prisma.user.create({ data });
  return toDtoMapper(createdUser);
}
