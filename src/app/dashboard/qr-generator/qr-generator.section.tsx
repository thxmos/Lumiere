"use client";

import React, { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { createQRCodeAction } from "./actions";
import { generateQRCode } from "./utils";
import { PLACEHOLDER_IMG } from "@/constants/images";
import QRModal from "./qr-modal";

export const QRGeneratorSection = ({ userId }: { userId: string }) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const generateAndSetQRCode = async () => {
    const qrCodeUrl = generateQRCode(link);
    setQrCode(qrCodeUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      generateAndSetQRCode();
      await createQRCodeAction(link, title, userId);
      toast.success("QR code generated successfully");
    } catch (error) {
      toast.error("Failed to generate QR code");
    }
  };

  return (
    <DashboardCard
      title="QR Generator"
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
          <Button type="submit">Generate QR Code</Button>
        </div>
      </form>
      <QRModal
        title={title}
        linkUrl={link}
        qrCodeUrl={qrCode}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onConfirm={() => {}}
      />
    </DashboardCard>
  );
};
