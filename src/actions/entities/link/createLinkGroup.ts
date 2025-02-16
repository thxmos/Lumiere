"use server";

import {
  LinkGroupCreateDto,
  linkGroupRepository,
} from "@/modules/shared/core/db/repositories/linkGroup";

import { SessionUser } from "@/core/auth/lucia";
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
