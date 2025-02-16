"use server";

import { prisma } from "@/shared/core/db/prisma";
import { User } from "@prisma/client";

export async function updateUserById(
  id: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { id }, data });
}
