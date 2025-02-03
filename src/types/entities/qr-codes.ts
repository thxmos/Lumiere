import { QRCode } from "@prisma/client";

export type CreateQRCodeDto = {
  url: string;
  title: string;
  userId: string;
};

export type QRCodeDto = {
  id: string;
  url: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  scans: number;
};

// export type QRCodeDto = Omit<QRCode, "id">;
export type QRCodeDtoWithId = QRCode;
