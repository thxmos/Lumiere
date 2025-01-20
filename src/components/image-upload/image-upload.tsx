"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (image: string | null) => void;
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

export function ImageUpload({
  initialImage,
  onImageChange,
  size = "sm",
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        onImageChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden`}>
      {image ? (
        <div className="w-full h-full group">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="text-white hover:text-red-500"
            >
              <X className={iconSizes[size]} />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className={`${sizeClasses[size]} flex items-center justify-center bg-gray-100 cursor-pointer`}
        >
          <Upload className={`${iconSizes[size]} text-gray-400`} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
