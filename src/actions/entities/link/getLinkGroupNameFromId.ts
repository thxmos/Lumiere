"use server";

import { linkGroupRepository } from "@/repositories/linkGroups";

export const getLinkGroupNameFromId = async (id: string) => {
  const linkGroup = await linkGroupRepository.findById(id);
  return linkGroup?.name;
};
