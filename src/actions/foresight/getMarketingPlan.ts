"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";
import { format } from "date-fns";

export type ActionCategory =
  | "PRE_RELEASE"
  | "RELEASE_DAY"
  | "POST_RELEASE"
  | "GENRE_SPECIFIC"
  | "PLATFORM_AND_AUDIENCE";

type MarketingPlanInput = {
  songTitle: string;
  songDescription: string;
  genre: string;
  mood: string;
  inspiration: string;
  targetAudience: string;
  releaseDate: Date;
};

type ClaudeAction = {
  title: string;
  description: string;
  completeDate: string;
  category: ActionCategory;
};

type ClaudeResponse = {
  actions: ClaudeAction[];
};

export const createMarketingPlan = withAuth(
  async (
    user: SessionUser,
    {
      songTitle,
      songDescription,
      genre,
      mood,
      inspiration,
      targetAudience,
      releaseDate,
    }: MarketingPlanInput,
  ) => {
    if (!prisma) {
      return { success: false, error: "Database connection not initialized" };
    }

    try {
      // Create the campaign record with all details
      const campaign = await prisma.campaign.create({
        data: {
          songTitle,
          songDescription,
          genre,
          mood,
          inspiration,
          targetAudience,
          releaseDate,
          userId: user.id,
        },
      });

      // Get marketing plan from Claude
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY!,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are a music marketing strategy expert. Respond only with a single JSON object, no explanations or additional text.

Generate a detailed music marketing plan using this data:

Song Title: ${songTitle}
Description: ${songDescription}
Genre: ${genre}
Mood: ${mood}
Inspiration: ${inspiration}
Target Audience: ${targetAudience}
Release Date: ${format(releaseDate, "PPP")}

Schema:
{
  "actions": [
    {
      "title": string,
      "description": string,
      "completeDate": string (YYYY-MM-DD),
      "category": "PRE_RELEASE" | "RELEASE_DAY" | "POST_RELEASE" | "GENRE_SPECIFIC" | "PLATFORM_AND_AUDIENCE"
    }
  ]
}

Requirements:
- Return ONLY the JSON object
- Generate 3 actions for each category (15 total actions)
- All dates must be before or on ${format(releaseDate, "yyyy-MM-dd")}
- Ensure strict JSON formatting
- No explanatory text before or after the JSON
- Activities should be specific and actionable
- Tailor suggestions to the specific genre and target audience
- Include mood-appropriate promotional ideas
- Reference the song's inspiration in marketing angles`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      if (!data.content?.[0]?.text) {
        console.error("API Response:", JSON.stringify(data, null, 2));
        throw new Error("Invalid API response format");
      }

      console.log("Raw API Response:", data.content[0].text);

      let plan: ClaudeResponse;
      try {
        plan = JSON.parse(data.content[0].text) as ClaudeResponse;
      } catch (parseError) {
        console.error("Parse Error Details:", parseError);
        console.error("Failed Text:", data.content[0].text);
        throw new Error(
          `Failed to parse AI response as JSON: ${(parseError as Error).message}`,
        );
      }

      if (!Array.isArray(plan?.actions)) {
        throw new Error("Invalid response format: missing actions array");
      }

      // Create all actions for the campaign
      await prisma.action.createMany({
        data: plan.actions.map((action) => ({
          campaignId: campaign.id,
          title: action.title,
          description: action.description,
          completeDate: new Date(action.completeDate),
          category: action.category,
        })),
      });

      // Fetch the complete campaign with actions
      const completeCampaign = await prisma.campaign.findUnique({
        where: { id: campaign.id },
        include: {
          actions: {
            orderBy: {
              completeDate: "asc",
            },
          },
        },
      });

      if (!completeCampaign) {
        throw new Error("Failed to fetch created campaign");
      }

      return { success: true, data: completeCampaign };
    } catch (error) {
      console.error("Error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create marketing plan",
      };
    }
  },
);
