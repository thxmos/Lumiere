"use server";

import {
  LinkGroupCreateDto,
  linkGroupRepository,
} from "@/repositories/linkGroups";

import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const createLinkGroup = withAuth(
  async (user: SessionUser, data: Partial<LinkGroupCreateDto>) => {
    const linkGroup = await linkGroupRepository.create({
      ...data,
      userId: user.id,
    });
    return linkGroup;
  },
);
