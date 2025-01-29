import { prisma } from "@/utils/lib/prisma";

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

export const createScan = async (scan: CreateScanDto) => {
  const newScan = await prisma.scan.create({
    data: {
      qrId: scan.qrId,
      browser: scan.browser,
      browserVersion: scan.browserVersion,
      operatingSystem: scan.operatingSystem,
      deviceType: scan.deviceType,
      screenResolution: scan.screenResolution,
      language: scan.language,
      timezone: scan.timezone,
    },
  });
  return newScan;
};
