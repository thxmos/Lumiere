"use client";

import React, { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const QRGeneratorPage = () => {
  const [link, setLink] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (link) {
      const encodedLink = encodeURIComponent(link);
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=200x200`;
      setQrCode(qrCodeUrl);
    }
  };

  return (
    <DashboardCard
      title="QR Generator"
      description="Generate QR codes for your links"
    >
      <form onSubmit={generateQRCode} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="link">Enter your link</Label>
          <Input
            id="link"
            type="url"
            placeholder={`https://example.com/username`}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Generate QR Code</Button>
      </form>
      {qrCode && (
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold">Generated QR Code:</h3>
          <div className="relative w-[200px] h-[200px]">
            <Image
              src={qrCode || "/placeholder.svg"}
              alt="Generated QR Code"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-sm text-gray-500">
            Scan this QR code to open the link:{" "}
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              {link}
            </Link>
          </p>
        </div>
      )}
    </DashboardCard>
  );
};

export default QRGeneratorPage;
