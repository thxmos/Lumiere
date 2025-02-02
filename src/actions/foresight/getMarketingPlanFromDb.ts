"use server";

import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

export const getUserMarketingDataFromDb = withAuth(
  async (user: SessionUser) => {
    try {
      const marketingData = await prisma.song.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          description: true,
          releaseDate: true,
          createdAt: true,
          marketingPlans: {
            include: {
              categories: {
                include: {
                  actions: {
                    orderBy: {
                      completeDate: "asc",
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        data: marketingData,
      };
    } catch (error) {
      console.error("Error fetching marketing data:", error);
      return {
        success: false,
        error: "Failed to fetch marketing data",
      };
    }
  },
);

// Types for the returned data
export type MarketingAction = {
  id: string;
  title: string;
  description: string;
  completeDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type MarketingCategory = {
  id: string;
  title: string;
  actions: MarketingAction[];
  createdAt: Date;
  updatedAt: Date;
};

export type MarketingPlan = {
  id: string;
  categories: MarketingCategory[];
  createdAt: Date;
  updatedAt: Date;
};

export type SongWithMarketing = {
  id: string;
  description: string;
  releaseDate: Date;
  createdAt: Date;
  marketingPlans: MarketingPlan[];
};
