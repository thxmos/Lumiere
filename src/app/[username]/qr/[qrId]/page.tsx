import { redirect } from "next/navigation";
import { updateQrScanAction } from "./actions";
import { getQRCodeById } from "@/data-access/qr-codes";

export default async function QRRedirectPage({
  params,
}: {
  params: { qrId: string };
}) {
  const { qrId } = params;

  //TODO: check if referring page is the user's page
  //TODO: maybe use preview query param here to disable scans
  // Update scan count
  await updateQrScanAction(qrId);

  // Get QR code data
  const qrCode = await getQRCodeById(qrId);

  if (!qrCode?.url) {
    return redirect("/404");
  }

  // Redirect to target URL
  redirect(qrCode.url);
}
