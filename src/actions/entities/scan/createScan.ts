"use server";

import { scanRepository } from "@/repositories/scan";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export type CreateScanDto = {
  qrId: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  deviceType: string;
  screenResolution: string;
  language: string;
  timezone: string;
};

export const createScan = withAuth(
  async (user: SessionUser, scan: CreateScanDto) => {
    const newScan = await scanRepository.create({
      qrId: scan.qrId,
      browser: scan.browser,
      browserVersion: scan.browserVersion,
      operatingSystem: scan.operatingSystem,
      deviceType: scan.deviceType,
      screenResolution: scan.screenResolution,
      language: scan.language,
      timezone: scan.timezone,
    });
    return newScan;
  },
);
