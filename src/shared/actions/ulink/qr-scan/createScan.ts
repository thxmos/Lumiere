"use server";

import { qrScanRepository } from "@/shared/core/db/repositories/qr-scan";
import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/shared/utils/security/auth";

// TODO: temporarily used, should be replaced with QRScanCreateInput
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
    const newScan = await qrScanRepository.create({
      qrCode: { connect: { id: scan.qrId } },
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
