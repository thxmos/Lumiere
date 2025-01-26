import { QRCodeDto } from "@/types/qr-codes";
import { create } from "zustand";

type QRCodeStore = {
  qrCodes: QRCodeDto[];
  setQRCodes: (qrCodes: QRCodeDto[]) => void;
};

export const useQRCodeStore = create<QRCodeStore>((set) => ({
  qrCodes: [],
  setQRCodes: (qrCodes) => set({ qrCodes }),
}));

export const addQRCodeStore = (qrCode: QRCodeDto) => {
  const qrCodes = useQRCodeStore.getState().qrCodes;
  useQRCodeStore.setState({ qrCodes: [...qrCodes, qrCode] });
};

export const removeQRCodeStore = (qrCodeId: string) => {
  const qrCodes = useQRCodeStore.getState().qrCodes;
  useQRCodeStore.setState({
    qrCodes: qrCodes.filter((qrCode) => qrCode.id !== qrCodeId),
  });
};
