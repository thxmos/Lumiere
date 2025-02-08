"use server";

import { userRepository } from "@/repositories/user";

/*
 * getUserByUsername()
 * used on public ULink profile page
 */
export const getUserByUsername = async (username: string) => {
  const data = await userRepository.findByUsername(username);
  if (!data) return null;
  const { id, ...rest } = data;
  return rest;
};
