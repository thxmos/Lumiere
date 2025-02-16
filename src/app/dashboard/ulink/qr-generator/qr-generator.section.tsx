"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { DashboardCard } from "@/shared/components/layouts/dashboard-card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { generateQRCode2 } from "./utils";
import { PLACEHOLDER_IMG } from "@/config/theme/images";
import QRModal from "../../../../modules/uLink/components/qr-modal";
import { useQRCodeStore } from "@/shared/stores/old/qr-codes";
import { QRCodeDto } from "@/shared/types/entities/qr-codes";
import { createQRCode } from "@/shared/actions/ulink/qr-code/createQrCode";
import { QrCodeIcon } from "lucide-react";

// Add initialQRCodes to the props
export const QRGeneratorSection = ({
  userId,
  initialQRCodes,
}: {
  userId: string;
  initialQRCodes: QRCodeDto[];
}) => {
  const { qrCodes, setQRCodes } = useQRCodeStore();

  useEffect(() => {
    setQRCodes(initialQRCodes);
  }, [initialQRCodes, setQRCodes]);

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const qrCode = await createQRCode({ url: link, title, userId });
      const qrCodeUrl = generateQRCode2(qrCode.id);
      setQrCode(qrCodeUrl);
      const qrCodes = useQRCodeStore.getState().qrCodes;
      useQRCodeStore.setState({ qrCodes: [...qrCodes, qrCode] as QRCodeDto[] });
      toast.success("QR code generated successfully");
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <QrCodeIcon className="w-8 h-8" />
          QR Generator
        </div>
      }
      description="Generate QR codes for your links"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder={`Title`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Enter your link</Label>
          <Input
            id="link"
            type="url"
            placeholder={`https://example.com/username`} //TODO: Add a placeholder image for the project
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        {qrCode && (
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">Generated QR Code:</h3>
            <div className="relative w-[200px] h-[200px]">
              <Image
                src={qrCode || PLACEHOLDER_IMG}
                alt="Generated QR Code"
                className="object-contain border border-primary cursor-pointer"
                width={200}
                height={200}
                onClick={() => setIsQRModalOpen(true)}
              />
            </div>
          </div>
        )}
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={qrCodes.length >= 10}>
            Generate QR Code
          </Button>
        </div>
      </form>
      <QRModal
        title={title}
        linkUrl={link}
        qrCodeUrl={qrCode}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </DashboardCard>
  );
};
