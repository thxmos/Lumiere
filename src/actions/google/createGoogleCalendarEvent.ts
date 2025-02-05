"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import { Action } from "@prisma/client";
import { getGoogleAccessToken } from "./getGoogleAccessToken";
import { prisma } from "@/utils/lib/prisma";

function formatEventDescription(action: Action, campaignTitle: string) {
  return `
Campaign: ${campaignTitle}
Category: ${action.category}
Description: ${action.description}

Created via Lumiere ☀️🌙 Foresight
Action ID: ${action.id}
`;
}

export const createCalendarEvent = withAuth(
  async (user: SessionUser, action: Action, campaignTitle: string) => {
    try {
      const accessToken = await getGoogleAccessToken(user.id);

      const event = {
        summary: campaignTitle + " - " + action.title,
        description: formatEventDescription(action, campaignTitle),
        colorId: "6", // Tangerine
        start: {
          date: action.completeDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          date: action.completeDate.toISOString().split("T")[0], // Same day
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        // additional metadata
        extendedProperties: {
          private: {
            actionId: action.id,
            campaignId: action.campaignId,
            category: action.category,
          },
        },
      };

      //TODO: add retry logic
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create calendar event");
      }

      await prisma.action.update({
        where: { id: action.id },
        data: { lastSyncedToCalendarAt: new Date() },
      });

      return await response.json();
    } catch (error) {
      console.error("Error creating calendar event:", error);
      throw error;
    }
  },
);
