// 1

"use client";

import { useEffect, useState } from "react";
import { ImageOff, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssetUploadDialog } from "./asset-upload-modal";
import { FileType } from "./file-upload";
import { cn } from "@/utils/utils";

interface ImageUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  previewImg?: string;
  fileType: FileType | null;
  setPreviewImg: (image: string | null) => void;
  onImageChange: (image: File | null) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
}

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

/*
TODO:
- make this more robust
- placeholder image, dont show upload button if theres no image and disabled
*/

// Used for Link uploads currently

export function ImageUpload({
  previewImg,
  setPreviewImg,
  onImageChange,
  fileType,
  disabled = false,
  size = "sm",
  rounded = false,
}: ImageUploadProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      // Get a base64 string of the file for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImg(base64String);
        onImageChange(file);
        setIsDialogOpen(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImg(null);
    setPreviewImg(null);
    onImageChange(null);
  };

  // Set the preview image to the initial image if it exists
  useEffect(() => {
    setPreviewImg(previewImg || null);
  }, [previewImg]);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-primary",
        `${sizeClasses[size]}`,
        `${rounded ? "rounded-full" : "rounded-lg"}`,
      )}
    >
      {previewImg ? (
        <div className="w-full h-full group">
          {fileType === FileType.Image ? (
            <img
              src={previewImg}
              alt="Uploaded Image"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={previewImg}
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
        assetType={FileType.Image}
        setFile={setFile}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpload={onUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
