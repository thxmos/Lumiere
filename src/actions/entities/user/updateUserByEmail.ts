"use server";

import { prisma } from "@/utils/lib/prisma";
import { User } from "@prisma/client";

export async function updateUserByEmail(
  email: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { email }, data });
}
