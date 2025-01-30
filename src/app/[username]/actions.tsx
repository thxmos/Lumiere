"use server";

import { createClick, createClickSocial } from "@/actions/entities/clicks";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { BrowserData } from "@/types/clicks";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import { getLinkById } from "@/actions/entities/link/getLinkById";
import { updateLink } from "@/actions/entities/link/updateLink";

async function getLocationData(ip: string) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();
    return {
      country: data.country_name,
      city: data.city,
      region: data.region,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return null;
  }
}

export const getActiveLinksByUserId = async (userId: string) => {
  const links = await getLinksByUserId(userId);
  return links.filter((link) => link.active);
};

export const createClickForSocialAction = async (
  socialPlatformClicked: string,
  clientData: Partial<BrowserData>,
) => {
  const clickData = await getClientData(clientData);
  await createClickSocial(socialPlatformClicked, clickData as BrowserData);
};

export const updateLinkClicked = async (
  linkId: string,
  clientData: Partial<BrowserData>,
) => {
  const link = await getLinkById(linkId);
  if (!link) throw new Error("Link not found");
  link.clicks = (link.clicks || 0) + 1;
  await updateLink(linkId, link);

  const clickData = await getClientData(clientData);
  await createClick(linkId, clickData as BrowserData);
};

export const getClientData = async (clientData: Partial<BrowserData>) => {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";

  // TODO: probably some check if no userAgent
  const uaParser = new UAParser(clientData.userAgent || "");
  const browserInfo = uaParser.getBrowser();
  const osInfo = uaParser.getOS();
  const deviceInfo = uaParser.getDevice();

  const locationData = await getLocationData(ip);

  const clickData = {
    // Network info
    ipAddress: ip,
    userAgent: clientData.userAgent,
    referrer: clientData.referrer,

    // Browser info
    browser: browserInfo.name,
    browserVersion: browserInfo.version,
    operatingSystem: osInfo.name,
    deviceType: deviceInfo.type || "desktop", // Assumes desktop if not detected TODO: maybe make null or something
    screenResolution: clientData.screenResolution,
    language: clientData.language,
    timezone: clientData.timezone,

    // Session info
    sessionDuration: clientData.sessionDuration,

    // Location info
    ...(locationData || {}),
  };

  return clickData;
};
