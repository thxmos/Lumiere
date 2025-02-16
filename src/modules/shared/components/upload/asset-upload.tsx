// 1

"use client";

import { useEffect, useState } from "react";
import { ImageOff, Upload, X } from "lucide-react";
import { Button } from "@/modules/shared/components/ui/button";
import { AssetUploadDialog } from "./asset-upload-modal";
import { FileType } from "./file-upload";
import { cn } from "@/utils/utils";
import { getAssetType } from "@/utils/lib/asset";

const sizeClasses = {
  sm: "min-w-20 min-h-20 max-w-20 max-h-20",
  md: "min-w-32 min-h-32 max-w-32 max-h-32",
  lg: "min-w-48 min-h-48 max-w-48 max-h-48",
};

const iconSizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

interface ImageUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onImageChange?: (image: File | null) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  initialImage?: string | null;
}

export function AssetUpload({
  file,
  setFile,
  onImageChange,
  disabled = false,
  size = "sm",
  rounded = false,
  initialImage = null,
}: ImageUploadProps) {
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onUpload = async () => {
    if (!file) return;

    try {
      // Get a base64 string of the file for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        handleImageChange(file);
        setIsDialogOpen(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    handleImageChange(null);
  };

  const handleImageChange = (file: File | null) => {
    setFileType(file?.type.includes("image") ? FileType.Image : FileType.Video);
    setFile(file);
    onImageChange?.(file);
  };

  // Set the preview image to the initial image if it exists

  useEffect(() => {
    setPreviewImage(initialImage);

    setFileType(getAssetType(initialImage));
  }, [initialImage]);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-primary",
        `${sizeClasses[size]}`,
        `${rounded ? "rounded-full" : "rounded-lg"}`,
      )}
    >
      {previewImage ? (
        <div className="w-full h-full group">
          {fileType === FileType.Image ? (
            <img
              src={previewImage}
              alt="Uploaded Image"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={previewImage}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity",
              `${!disabled && "group-hover:opacity-100"}`,
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-white hover:text-red-500"
              disabled={disabled}
            >
              <X className={`${iconSizes[size]} text-primary`} />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-background group",
            `${sizeClasses[size]}`,
            `${!disabled && "cursor-pointer"}`,
          )}
          onClick={() => !disabled && setIsDialogOpen(true)}
        >
          {disabled ? (
            <ImageOff
              className={cn(
                "text-primary group-hover:opacity-70 transition-all ease-in-out",
                `${iconSizes[size]} `,
              )}
            />
          ) : (
            <Upload
              className={cn(
                "text-primary group-hover:opacity-70 transition-all ease-in-out",
                `${iconSizes[size]} `,
              )}
            />
          )}
        </div>
      )}
      <AssetUploadDialog
        file={file}
        setFile={setFile}
        assetType={FileType.Image}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpload={onUpload}
      />
    </div>
  );
}
