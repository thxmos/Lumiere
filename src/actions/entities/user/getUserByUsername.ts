"use server";

import { userRepository } from "@/repositories/user";

// used on username page
export const getUserByUsername = async (username: string) => {
  const data = await userRepository.findByUsername(username);
  if (!data) return null;
  const { id, ...rest } = data;
  return rest;
};
