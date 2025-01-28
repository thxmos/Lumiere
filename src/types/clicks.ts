import { Click } from "@prisma/client";

export type ClicksDto = Omit<Click, "id">;
export type ClickDtoWithId = Click;

export interface BrowserData {
  ipAddress: string | null;
  userAgent: string | null;
  referrer: string | null;
  browser: string | null;
  browserVersion: string | null;
  operatingSystem: string | null;
  deviceType: string | null;
  screenResolution: string | null;
  language: string | null;
  timezone: string | null;
  sessionDuration: number | null;
  exitPage: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
}
