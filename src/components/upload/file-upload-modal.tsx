"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/upload/file-upload";

// TODO: only used in avatar upload currently
// replace with asset upload dialog and delete this file

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
          <DialogTitle>Upload Asset</DialogTitle>
          <DialogDescription>
            <span className="font-bold">Supported formats:</span> .jpg, .jpeg,
            .png, .mp4, .mov, .avi, .mkv
          </DialogDescription>
        </DialogHeader>
        <FileUpload
          fileType={FileType.Image}
          file={file}
          setFile={setFile}
          onUpload={onUpload}
          acceptedTypes={{
            "image/jpg": [],
            "image/jpeg": [],
            "image/png": [],
            // "image/gif": [],
            "video/mp4": [],
          }}
          // uploading={isUploading}
        />
      </DialogContent>
    </Dialog>
  );
}
