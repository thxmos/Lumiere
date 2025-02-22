"use server";

import { linkGroupRepository } from "@core/db/repositories/linkGroup";

export const deleteLinkGroup = async (id: string) => {
  await linkGroupRepository.delete(id);
};
