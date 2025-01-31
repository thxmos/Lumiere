import { toDtoMapper, UserDto } from "./createUser";

import { prisma } from "@/utils/lib/prisma";

export async function getUserById(id: string): Promise<UserDto> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }

  return toDtoMapper(foundUser);
}
