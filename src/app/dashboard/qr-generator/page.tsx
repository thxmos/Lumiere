import { getUser } from "@/actions/session.actions";
import { QRCodeList } from "./qr-codes-list";
import { QRGenerator } from "./qr-generator";
import { getQRCodesByUserId } from "@/data-access/qr-codes";

const QRGeneratorPage = async () => {
  const { user } = await getUser();
  if (!user) return null;

  return (
    <div className="flex flex-col gap-4">
      <QRGenerator userId={user.id} />
      <QRCodeList userId={user.id} />
    </div>
  );
};

export default QRGeneratorPage;
