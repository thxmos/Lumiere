import { QRListSection } from "./qr-list.section";
import { QRGeneratorSection } from "./qr-generator.section";
import { validateAuthPage } from "@/utils/security/auth";
import { getQRCodesByUserId } from "@/shared/actions/ulink/qr-code/getQrCodesByUserId";
import { QRCodeDto } from "@/shared/types/entities/qr-codes";
/*
TODO:
- Add a click counter to the QR code
- Create new QR code should add it in real time, hook up with zustand
*/

const QRGeneratorPage = async () => {
  const user = await validateAuthPage();
  const qrCodes = await getQRCodesByUserId();

  return (
    <div className="flex flex-col gap-4">
      <QRGeneratorSection
        userId={user.id}
        initialQRCodes={qrCodes as QRCodeDto[]}
      />
      <QRListSection />
    </div>
  );
};

export default QRGeneratorPage;
