"use server";

import { prisma } from "@/modules/shared/core/db/prisma";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = `${process.env.BASE_URL}/callback/spotify`;

export async function initiateSpotifyAuth() {
  const state = createHash("sha256")
    .update(Math.random().toString())
    .digest("hex");

  // Added required scopes for artist data
  const scope = [
    "user-read-private",
    "user-read-email",
    "artist-read-private",
    "artist-read-analytics",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    state,
  });

  redirect(`https://accounts.spotify.com/authorize?${params}`);
}

export async function handleSpotifyCallback(code: string) {
  const userId = cookies().get("userId")?.value;
  if (!userId) {
    throw new Error("No user ID found in cookies");
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get tokens: ${error}`);
  }

  const tokens = await tokenResponse.json();

  const profileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  if (!profileResponse.ok) {
    throw new Error("Failed to fetch Spotify profile");
  }

  const profile = await profileResponse.json();

  // Check if user already has a SpotifyToken
  const existingToken = await prisma.spotifyToken.findFirst({
    where: { userId },
  });

  if (existingToken) {
    // Update existing token
    await prisma.spotifyToken.update({
      where: { id: existingToken.id },
      data: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        spotifyArtistId: profile.id,
      },
    });
  } else {
    // Create new token
    await prisma.spotifyToken.create({
      data: {
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        spotifyArtistId: profile.id,
      },
    });
  }

  redirect("/dashboard");
}

async function refreshToken(tokenId: string) {
  const token = await prisma.spotifyToken.findUnique({
    where: { id: tokenId },
  });

  if (!token) {
    throw new Error("No Spotify token found");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const tokens = await response.json();

  const updatedToken = await prisma.spotifyToken.update({
    where: { id: tokenId },
    data: {
      accessToken: tokens.access_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    },
  });

  return updatedToken.accessToken;
}

export async function getArtistStats() {
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
    accessToken = await refreshToken(spotifyToken.id);
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${spotifyToken.spotifyArtistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch artist stats");
  }

  const artistData = await response.json();

  // Store the stats in the database
  await prisma.spotifyStats.create({
    data: {
      userId,
      followers: artistData.followers.total,
      popularity: artistData.popularity,
      monthlyListeners: null, // Note: This requires a separate API call to get monthly listeners
    },
  });

  return artistData;
}

// Optional: Helper function to get historical stats
export async function getHistoricalStats(userId: string) {
  return prisma.spotifyStats.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: 30, // Last 30 data points
  });
}
