"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/file-upload";

interface ImageUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => Promise<void>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isUploading: boolean;
}

export function ImageUploadDialog({
  isOpen,
  onOpenChange,
  onUpload,
  file,
  setFile,
  isUploading,
}: ImageUploadDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Image</DialogTitle>
          <DialogDescription>
            Upload an image and click upload file to update.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FileUpload
            fileType={FileType.Image}
            file={file}
            setFile={setFile}
            onUpload={onUpload}
            acceptedTypes={{
              "image/jpeg": [],
              "image/png": [],
            }}
            uploading={isUploading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
