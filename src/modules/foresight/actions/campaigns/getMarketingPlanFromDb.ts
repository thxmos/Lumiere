"use server";

import { prisma } from "@/shared/core/db/prisma";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";
import { Campaign, Action } from "@prisma/client";

// Define the type that includes the actions relation
export type CampaignWithActions = Campaign & {
  actions: Action[];
};

export const getUserMarketingDataFromDb = withAuth(
  async (user: SessionUser) => {
    try {
      const campaigns = (await prisma.campaign.findMany({
        where: {
          userId: user.id,
        },
        include: {
          actions: {
            orderBy: {
              completeDate: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })) as CampaignWithActions[];

      return {
        success: true,
        data: campaigns,
      };
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch campaign data",
      };
    }
  },
);
