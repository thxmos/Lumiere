import { getUser } from "@/actions/session";
import { QRListSection } from "./qr-list.section";
import { QRGeneratorSection } from "./qr-generator.section";
import { getQRCodesByUserIdAction } from "./actions";

/*
TODO:
- Add a click counter to the QR code
- Create new QR code should add it in real time, hook up with zustand
*/

const QRGeneratorPage = async () => {
  const { user } = await getUser();
  if (!user) return null;
  const qrCodes = await getQRCodesByUserIdAction(user.id);

  return (
    <div className="flex flex-col gap-4">
      <QRGeneratorSection userId={user.id} initialQRCodes={qrCodes} />
      <QRListSection />
    </div>
  );
};

export default QRGeneratorPage;
