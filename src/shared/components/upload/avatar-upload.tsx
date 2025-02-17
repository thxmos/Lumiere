"use client";

import React, { useState } from "react";
import { FileType } from "@/shared/components/upload/file-upload";
import { AssetUpload } from "@/shared/components/upload/asset-upload";

interface AvatarUploadProps {
  avatarFile: File | null;
  setAvatarFile: (file: File | null) => void;
  avatarUrl: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  avatarFile,
  setAvatarFile,
  avatarUrl,
}) => {
  const [preview, setPreview] = useState<string | null>(avatarUrl); // base64 string of the image
  const [fileType, setFileType] = useState<FileType | null>(null);

  async function onImageChange(file: File | null): Promise<void> {
    setAvatarFile(file);
    setFileType(file?.type.includes("image") ? FileType.Image : FileType.Video);
  }

  return (
    <div className="w-36 grid place-items-center gap-4">
      <AssetUpload
        file={avatarFile}
        setFile={setAvatarFile}
        onImageChange={onImageChange}
        initialImage={avatarUrl}
        size="md"
        rounded={true}
      />
    </div>
  );
};

export default AvatarUpload;
