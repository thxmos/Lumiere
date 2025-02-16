import type { QRCodeDto } from "@/modules/shared/types/entities/qr-codes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/*
TODO: look at how middleware is used in zustand
*/

type QRCodeStore = {
  qrCodes: QRCodeDto[];
  setQRCodes: (qrCodes: QRCodeDto[]) => void;
  addQRCode: (qrCode: QRCodeDto) => void;
  removeQRCode: (qrCodeId: string) => void;
};

export const useQRCodeStore = create<QRCodeStore>()(
  persist(
    (set) => ({
      qrCodes: [],
      setQRCodes: (qrCodes) => set({ qrCodes }),
      addQRCode: (qrCode) =>
        set((state) => ({ qrCodes: [qrCode, ...state.qrCodes] })),
      removeQRCode: (qrCodeId) =>
        set((state) => ({
          qrCodes: state.qrCodes.filter((qrCode) => qrCode.id !== qrCodeId),
        })),
    }),
    {
      name: "qr-code-storage",
    },
  ),
);
