import { redirect } from "next/navigation";
import { updateQrScan } from "@/actions/entities/qr-code/updateQrScan";
import { getQRCodeById } from "@/actions/entities/qr-code/getQrCodeById";
import { BrowserData } from "@/types/clicks";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export default async function QRRedirectPage({
  params,
}: {
  params: { qrId: string };
}) {
  const { qrId } = params;

  // Collect browser data
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const referer = headersList.get("referer") || "";
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "Unknown";

  const uaParser = new UAParser(userAgent || "");
  const browserInfo = uaParser.getBrowser();
  const osInfo = uaParser.getOS();
  const deviceInfo = uaParser.getDevice();

  const browserData: Partial<BrowserData> = {
    ipAddress: ip,
    userAgent: userAgent,
    referrer: referer,
    browser: browserInfo.name,
    browserVersion: browserInfo.version,
    operatingSystem: osInfo.name,
    deviceType: deviceInfo.type || "desktop",
    language: headersList.get("accept-language") || undefined,
    // Note: We can't get screen resolution, timezone, or precise geolocation server-side
  };

  //TODO: check if referring page is the user's page
  //TODO: maybe use preview query param here to disable scans
  // Update scan count
  await updateQrScan(qrId, browserData);

  // Get QR code data
  const qrCode = await getQRCodeById(qrId);

  if (!qrCode?.url) {
    return redirect("/404");
  }

  // Redirect to target URL
  redirect(qrCode.url);
}
