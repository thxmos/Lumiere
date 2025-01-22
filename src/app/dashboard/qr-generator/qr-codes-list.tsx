import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  return (
    <DashboardCard
      title="QR Codes"
      description="List of QR codes you generated"
    >
      {QR_CODES.map((qrCode, index) => (
        <Card key={qrCode.id} className="flex flex-col gap-2 ">
          <div className="flex gap-2 p-4">
            <h3>{index + 1}</h3>
            <h3>{qrCode.url}</h3>
          </div>
          {/* <Image src={qrCode.url} alt={qrCode.url} width={200} height={200} /> */}
        </Card>
      ))}
    </DashboardCard>
  );
};
