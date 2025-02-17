"use server";

import { linkGroupRepository } from "@/shared/core/db/repositories/linkGroup";

export const deleteLinkGroup = async (id: string) => {
  await linkGroupRepository.delete(id);
};
