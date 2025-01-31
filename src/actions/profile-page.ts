"use server";

import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { BrowserData } from "@/types/clicks";
import { CreateScanDto } from "@/actions/entities/scan/createScan";
import { getQRCodeById } from "@/actions/entities/qr-code/getQrCodeById";
import { updateQRCode } from "@/actions/entities/qr-code/updateQrCode";
import { createScan } from "@/actions/entities/scan/createScan";
import { userRepository } from "@/repositories/user";
import { linkRepository } from "@/repositories/link";
import { clickRepository } from "@/repositories/click";

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

// public
export const getActiveLinksByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return [];
  const links = await linkRepository.getLinksByUserId(user.id);
  return links.filter((link) => link.active);
};

export const createClickForSocialAction = async (
  socialPlatformClicked: string,
  clientData: Partial<BrowserData>,
) => {
  const clickData = await getClientData(clientData);
  // await createClickSocial(socialPlatformClicked, clickData as BrowserData);
};

// Can probably assume the click exists if its displayed on the page
export const updateLinkClicked = async (
  linkId: string,
  clientData: Partial<BrowserData>,
) => {
  const link = await linkRepository.findById(linkId);
  // if (!link) throw new Error("Link not found");
  if (!link) return;

  await linkRepository.update(linkId, {
    clicks: { increment: 1 },
  });

  const clickData = await getClientData(clientData);

  await clickRepository.create({
    ...clickData,
    link: { connect: { id: linkId } },
  });
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

export const updateQrScanAction = async (
  qrId: string,
  browserData: Partial<BrowserData>,
) => {
  const qrCode = await getQRCodeById(qrId);
  if (!qrCode) throw new Error("QR code not found");

  await updateQRCode(qrId, {
    scans: (qrCode.scans || 0) + 1,
  });

  await createScan({
    qrId,
    ...browserData,
  } as CreateScanDto);
};
