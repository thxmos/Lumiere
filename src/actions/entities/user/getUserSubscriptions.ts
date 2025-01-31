"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";

export const getUserSubscriptions = withAuth(async (user: SessionUser) => {
  //TODO: use repository, double check what select subscriptions true is returning exactly
  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptions: true,
    },
  });

  if (!data || data.subscriptions.length === 0) return null;

  return data.subscriptions;
});
