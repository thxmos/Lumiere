"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadAvatar } from "@/actions/file-upload/createAsset";
import { getInitials } from "@/utils/utils";
import { ImageUploadDialog } from "../../../components/upload/file-upload-modal";
import { Upload } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface AvatarUploadProps {
  avatar: string | null;
  name: string;
}

export function AvatarUpload({ avatar, name }: AvatarUploadProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarUpload = async () => {
    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("file", avatarFile!);
      await uploadAvatar(formData);
      setIsModalOpen(false);
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload avatar",
      );
    }
    setIsUploadingAvatar(false);
  };

  return (
    <div className="w-36 grid place-items-center gap-4">
      <Avatar className="w-28 h-28 border border-primary">
        <AvatarImage src={avatar ?? undefined} alt="Avatar" />
        <AvatarFallback className="bg-red-500 text-white text-xs">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <ImageUploadDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onUpload={handleAvatarUpload}
        file={avatarFile}
        setFile={setAvatarFile}
        isUploading={isUploadingAvatar}
      />
      <Button
        className="w-full bg-primary"
        onClick={(e) => {
          e.preventDefault(); // dont trigger form in parent
          setIsModalOpen(true);
        }}
      >
        <Upload className="h-4 w-4 mr-2" />
        Update Avatar
      </Button>
    </div>
  );
}
