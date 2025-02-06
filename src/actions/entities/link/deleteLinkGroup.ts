"use server";

import { linkGroupRepository } from "@/repositories/linkGroups";

export const deleteLinkGroup = async (id: string) => {
  await linkGroupRepository.delete(id);
};
