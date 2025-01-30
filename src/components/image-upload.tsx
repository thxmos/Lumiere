"use client";

import { useState } from "react";
import { ImageOff, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploadDialog } from "./modals/image-upload-modal";

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (image: string | null) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
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

export function ImageUpload({
  initialImage,
  onImageChange,
  disabled = false,
  size = "sm",
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async () => {
    if (!tempFile) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onImageChange(base64String);
        setIsDialogOpen(false);
      };
      reader.readAsDataURL(tempFile);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden border border-primary`}
    >
      {image ? (
        <div className="w-full h-full group">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity ${!disabled ? "group-hover:opacity-100 cursor-pointer" : ""}`}
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
          className={`${sizeClasses[size]} flex items-center justify-center bg-gray-100 ${!disabled ? "cursor-pointer" : ""}`}
          onClick={() => !disabled && setIsDialogOpen(true)}
        >
          {!disabled ? (
            <Upload className={`${iconSizes[size]} text-primary`} />
          ) : (
            <ImageOff className={`${iconSizes[size]} text-primary`} />
          )}
        </div>
      )}
      <ImageUploadDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpload={handleImageUpload}
        file={tempFile}
        setFile={setTempFile}
        isUploading={isUploading}
      />
    </div>
  );
}
