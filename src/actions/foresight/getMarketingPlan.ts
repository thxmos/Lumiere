"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";
import { format } from "date-fns";

export const createMarketingPlan = withAuth(
  async (user: SessionUser, songDescription: string, releaseDate: Date) => {
    try {
      // First create the song record
      const song = await prisma.song.create({
        data: {
          description: songDescription,
          releaseDate: releaseDate,
          user: {
            connect: {
              id: user.id,
            },
          },
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
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a marketing strategy expert. Respond only with a single JSON object, no explanations or additional text.

                        Generate a music marketing plan using this data:

                        Song Details:
                        ${songDescription}
                        Release Date: ${format(new Date(releaseDate), "PPP")}

                        Schema:
                        {
                          "marketingPlan": [
                            {
                              "title": "Pre-Release Campaign",
                              "actions": [
                                {
                                  "title": string,
                                  "description": string,
                                  "completeDate": string (YYYY-MM-DD)
                                }
                              ]
                            },
                            {
                              "title": "Release Day Activities",
                              "actions": [
                                {
                                  "title": string,
                                  "description": string,
                                  "completeDate": string (YYYY-MM-DD)
                                }
                              ]
                            },
                            {
                              "title": "Post Release Engagement",
                              "actions": [
                                {
                                  "title": string,
                                  "description": string,
                                  "completeDate": string (YYYY-MM-DD)
                                }
                              ]
                            },
                            {
                              "title": "Target Audience",
                              "actions": [
                                {
                                  "title": string,
                                  "description": string,
                                  "completeDate": string (YYYY-MM-DD)
                                }
                              ]
                            },
                            {
                              "title": "Platform Strategies",
                              "actions": [
                                {
                                  "title": string,
                                  "description": string,
                                  "completeDate": string (YYYY-MM-DD)
                                }
                              ]
                            }
                          ]
                        }

                        Requirements:
                        - Return ONLY the JSON object
                        - Each actions array must contain exactly 3 items
                        - All dates must be before or on ${format(new Date(releaseDate), "PPP")}
                        - Ensure strict JSON formatting with no trailing commas
                        - No explanatory text or formatting before or after the JSON
                        - Activities should be specific and actionable`,
            },
          ],
        }),
      });

      const data = await response.json();
      const plan = JSON.parse(data.content[0].text);

      // Create the marketing plan and its related records
      const marketingPlan = await prisma.marketingPlan.create({
        data: {
          songId: song.id,
          categories: {
            create: plan.marketingPlan.map((category: any) => ({
              title: category.title,
              actions: {
                create: category.actions.map((action: any) => ({
                  title: action.title,
                  description: action.description,
                  completeDate: new Date(action.completeDate),
                })),
              },
            })),
          },
        },
        include: {
          categories: {
            include: {
              actions: true,
            },
          },
        },
      });

      return { success: true, data: marketingPlan };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Failed to create marketing plan" };
    }
  },
);
