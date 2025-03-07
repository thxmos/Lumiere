"use server";

import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/shared/utils/security/auth";
import { Action } from "@prisma/client";
import { getGoogleAccessToken } from "./getGoogleAccessToken";
import { prisma } from "@/shared/core/db/prisma";

function formatEventDescription(action: Action, campaignTitle: string) {
  return `
Campaign: ${campaignTitle}
Category: ${action.category}
Description: ${action.description}

Created via Lumiere ☀️🌙 Foresight
Action ID: ${action.id}
`;
}

export const updateGoogleCalendarEvent = withAuth(
  async (user: SessionUser, action: Action, campaignTitle: string) => {
    try {
      const accessToken = await getGoogleAccessToken(user.id);

      const event = {
        summary: campaignTitle + " - " + action.title,
        description: formatEventDescription(action, campaignTitle),
        colorId: "6",
        start: {
          date: action.completeDate.toISOString().split("T")[0],
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          date: action.completeDate.toISOString().split("T")[0],
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        extendedProperties: {
          private: {
            actionId: action.id,
            campaignId: action.campaignId,
            category: action.category,
          },
        },
      };

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${action.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        },
      );

      //TODO: not handling errors here

      if (!response.ok) {
        throw new Error("Failed to update calendar event");
      }

      await prisma.action.update({
        where: { id: action.id },
        data: { lastSyncedToCalendarAt: new Date() },
      });

      return await response.json();
    } catch (error) {
      console.error("Error updating calendar event:", error);
      throw error;
    }
  },
);
