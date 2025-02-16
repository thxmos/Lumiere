"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { BrowserData } from "@/shared/types/clicks";

// TODO: refactor into middleware?
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
