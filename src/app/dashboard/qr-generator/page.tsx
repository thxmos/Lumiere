import { QRCodeList } from "./qr-codes-list";
import { QRGenerator } from "./qr-generator";

const QRGeneratorPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <QRGenerator />
      <QRCodeList />
    </div>
  );
};

export default QRGeneratorPage;
