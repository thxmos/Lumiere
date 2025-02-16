import { prisma } from "@/modules/shared/core/db/prisma";

export async function refreshSpotifyToken(tokenId: string) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify client credentials are not configured");
  }

  const spotifyToken = await prisma.spotifyToken.findUnique({
    where: { id: tokenId },
    select: { refreshToken: true },
  });

  if (!spotifyToken) {
    throw new Error("No spotify token found");
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
      refresh_token: spotifyToken.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const tokens = await response.json();

  // Validate the response was successful
  if (!tokens.access_token) {
    throw new Error("No access token found");
  }

  if (!tokens.refresh_token) {
    throw new Error("No refresh token found");
  }

  if (!tokens.expires_in) {
    throw new Error("No expiration time found");
  }

  // Update the token in the SpotifyToken table
  await prisma.spotifyToken.update({
    where: { id: tokenId },
    data: {
      accessToken: tokens.access_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    },
  });

  return tokens.access_token;
}
