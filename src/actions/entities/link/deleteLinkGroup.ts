"use server";

import { linkGroupRepository } from "@/repositories/linkGroup";

export const deleteLinkGroup = async (id: string) => {
  await linkGroupRepository.delete(id);
};
