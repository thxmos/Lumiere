"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import { Action } from "@prisma/client";
import { getGoogleAccessToken } from "./getGoogleAccessToken";

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
      console.log("accessToken", accessToken);

      const event = {
        summary: campaignTitle + " - " + action.title,
        description: formatEventDescription(action, campaignTitle),
        start: {
          dateTime: action.completeDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          // Set end time to 1 hour after start by default
          dateTime: new Date(
            action.completeDate.getTime() + 60 * 60 * 1000,
          ).toISOString(),
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

      return await response.json();
    } catch (error) {
      console.error("Error creating calendar event:", error);
      throw error;
    }
  },
);
