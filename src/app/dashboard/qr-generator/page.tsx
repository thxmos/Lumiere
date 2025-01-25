import { getUser } from "@/actions/session.actions";
import { QRListSection } from "./qr-list.section";
import { QRGeneratorSection } from "./qr-generator.section";
import { getQRCodesByUserIdAction } from "./actions";

/*
TODO:
- Add a click counter to the QR code
- Create new QR code should add it in real time
- Add a delete button to the QR code
- Add a modal to confirm the deletion of the QR code
*/

const QRGeneratorPage = async () => {
  const { user } = await getUser();
  if (!user) return null;
  const qrCodes = await getQRCodesByUserIdAction(user.id);

  return (
    <div className="flex flex-col gap-4">
      <QRGeneratorSection userId={user.id} />
      <QRListSection qrCodes={qrCodes} />
    </div>
  );
};

export default QRGeneratorPage;
