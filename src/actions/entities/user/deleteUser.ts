"use server";

import { userRepository } from "@/repositories/user";

export async function deleteUser(id: string): Promise<void> {
  await userRepository.delete(id);
}
