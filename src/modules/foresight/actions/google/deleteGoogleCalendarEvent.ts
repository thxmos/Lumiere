"use server";

import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/shared/utils/security/auth";
import { getGoogleAccessToken } from "./getGoogleAccessToken";
import { prisma } from "@/shared/core/db/prisma";

export const deleteCalendarEvent = withAuth(
  async (user: SessionUser, actionId: string) => {
    try {
      const action = await prisma.action.findFirst({
        where: { id: actionId, campaign: { userId: user.id } },
      });

      if (!action?.lastSyncedToCalendarAt) {
        return null; // No synced event exists
      }

      const accessToken = await getGoogleAccessToken(user.id);

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${actionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok && response.status !== 404) {
        throw new Error("Failed to delete calendar event");
      }

      await prisma.action.update({
        where: { id: actionId },
        data: { lastSyncedToCalendarAt: null },
      });

      return true;
    } catch (error) {
      console.error("Error deleting calendar event:", error);
      throw error;
    }
  },
);
