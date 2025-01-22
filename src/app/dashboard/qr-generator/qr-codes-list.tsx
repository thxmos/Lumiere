import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const QR_CODES = [
  {
    id: 1,
    url: "https://example.com",
  },
  {
    id: 2,
    url: "https://example2.com/username",
  },
];

export const QRCodeList = () => {
  const generateQRCode = (link: string) => {
    const encodedLink = encodeURIComponent(link);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=200x200`;
    return qrCodeUrl;
  };

  return (
    <DashboardCard
      title="QR Codes"
      description="List of QR codes you generated"
    >
      {QR_CODES.map((qrCode, index) => (
        <Card key={qrCode.id} className="flex flex-col gap-2 ">
          <div className="flex gap-16 p-4 items-center ">
            <h3>{index + 1}</h3>
            <div className="relative w-[100px] h-[100px] ">
              <Image
                src={generateQRCode(qrCode.url)}
                alt="Generated QR Code"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>{qrCode.url}</h3>
              <p>Clicks: 100</p>
            </div>
          </div>
        </Card>
      ))}
    </DashboardCard>
  );
};
