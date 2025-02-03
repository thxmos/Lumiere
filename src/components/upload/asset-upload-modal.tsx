// 2

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "./file-upload";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface AssetUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => Promise<void>;
  file: File | null;
  setFile: (file: File | null) => void;
  assetType: FileType;
  title?: string;
}

export function AssetUploadDialog({
  isOpen,
  onOpenChange,
  onUpload,
  file,
  setFile,
  title = "Upload Asset",
}: AssetUploadDialogProps) {
  const [assetType, setAssetType] = useState<FileType>(FileType.Image);

  const acceptedTypes = {
    [FileType.Image]: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    [FileType.Video]: {
      "video/mp4": [],
      "video/quicktime": [], // .mov
      "video/x-msvideo": [], // .avi
      "video/x-matroska": [], // .mkv
    },
  };

  const descriptions = {
    [FileType.Image]: ".jpg, .jpeg, .png",
    [FileType.Video]: ".mp4, .mov, .avi, .mkv",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <span className="font-bold">Supported formats:</span>
            {descriptions[assetType]}
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() =>
            setAssetType(
              assetType === FileType.Image ? FileType.Video : FileType.Image,
            )
          }
        >
          <Badge variant={assetType === FileType.Image ? "default" : "outline"}>
            Image
          </Badge>
          <Badge variant={assetType === FileType.Video ? "default" : "outline"}>
            Video
          </Badge>
        </div>
        <FileUpload
          fileType={assetType}
          file={file}
          setFile={setFile}
          onUpload={onUpload}
          acceptedTypes={acceptedTypes[assetType]}
        />
      </DialogContent>
    </Dialog>
  );
}
