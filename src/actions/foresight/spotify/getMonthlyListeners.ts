"use server";

import { prisma } from "@/modules/shared/core/db/prisma";
import { cookies } from "next/headers";
import { getArtistStats } from "./initiateSpotifyAuth";
import { refreshSpotifyToken } from "./refreshSpotifyToken";

// TODO: update the scope in your initiateSpotifyAuth function to include:
const REQUIRED_SCOPE = [
  "user-read-private",
  "user-read-email",
  "artist-read-private",
  "artist-read-analytics",
  "app-remote-control",
].join(" ");

export async function getMonthlyListeners() {
  const userId = cookies().get("userId")?.value;
  if (!userId) {
    throw new Error("No user ID found");
  }

  const spotifyToken = await prisma.spotifyToken.findFirst({
    where: { userId },
  });

  if (!spotifyToken) {
    throw new Error("No Spotify token found for user");
  }

  let accessToken = spotifyToken.accessToken;

  if (spotifyToken.expiresAt < new Date()) {
    accessToken = await refreshSpotifyToken(spotifyToken.id);
  }

  // First get the artist ID if we don't have it
  if (!spotifyToken.spotifyArtistId) {
    const profileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch Spotify profile");
    }

    const profile = await profileResponse.json();
    await prisma.spotifyToken.update({
      where: { id: spotifyToken.id },
      data: { spotifyArtistId: profile.id },
    });
  }

  // Get monthly listeners using the Spotify for Artists API
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${spotifyToken.spotifyArtistId}/stats`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch monthly listeners");
  }

  const stats = await response.json();

  // Update the most recent stats entry or create a new one
  const latestStats = await prisma.spotifyStats.findFirst({
    where: { userId },
    orderBy: { timestamp: "desc" },
  });

  if (latestStats && isToday(latestStats.timestamp)) {
    // Update today's entry
    await prisma.spotifyStats.update({
      where: { id: latestStats.id },
      data: { monthlyListeners: stats.monthly_listeners },
    });
  } else {
    // Create a new entry
    await prisma.spotifyStats.create({
      data: {
        userId,
        monthlyListeners: stats.monthly_listeners,
        followers: stats.followers || 0, // Fallback if not available
        popularity: stats.popularity || 0, // Fallback if not available
      },
    });
  }

  return stats;
}

// Helper function to check if a date is today
function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Example usage:
export async function updateAllArtistStats() {
  const userId = cookies().get("userId")?.value;
  if (!userId) {
    throw new Error("No user ID found");
  }

  try {
    const [artistStats, monthlyListeners] = await Promise.all([
      getArtistStats(), // Your existing function
      getMonthlyListeners(),
    ]);

    return {
      ...artistStats,
      monthly_listeners: monthlyListeners.monthly_listeners,
    };
  } catch (error) {
    console.error("Failed to update artist stats:", error);
    throw error;
  }
}
