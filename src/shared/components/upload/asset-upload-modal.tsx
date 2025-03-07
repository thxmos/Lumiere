import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@components/ui/dialog";
import FileUpload, { FileType } from "./file-upload";
import { useState, forwardRef, useImperativeHandle, ForwardedRef } from "react";
import { Badge } from "@components/ui/badge";
import { Label } from "../ui/label";

interface AssetUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => Promise<void>;
  file: File | null;
  setFile: (file: File | null) => void;
  assetType?: FileType;
  title?: string;
}

// Define the interface for methods that will be exposed to parent
export interface AssetUploadDialogRef {
  resetAssetType: () => void;
}

export const AssetUploadDialog = forwardRef<
  AssetUploadDialogRef,
  AssetUploadDialogProps
>(
  (
    {
      isOpen,
      onOpenChange,
      onUpload,
      file,
      setFile,
      assetType: initialAssetType = FileType.Image,
      title = "Upload Asset",
    },
    ref,
  ) => {
    const [assetType, setAssetType] = useState<FileType>(initialAssetType);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      resetAssetType: () => {
        setAssetType(FileType.Image);
      },
    }));

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
      [FileType.Image]: [".jpg", ".jpeg", ".png"],
      [FileType.Video]: [".mp4", ".mov", ".avi", ".mkv"],
    };

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div
            className="flex gap-2 cursor-pointer items-center "
            onClick={() =>
              setAssetType(
                assetType === FileType.Image ? FileType.Video : FileType.Image,
              )
            }
          >
            <Label className="text-sm font-semibold">Select File Type:</Label>
            <Badge
              variant={assetType === FileType.Image ? "default" : "outline"}
              className="text-sm"
            >
              Image
            </Badge>
            <Badge
              variant={assetType === FileType.Video ? "default" : "outline"}
              className="text-sm"
            >
              Video
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 text-xs items-center">
            <span className="font-medium text-muted-foreground">
              Supported formats:
            </span>
            {descriptions[assetType].map((format) => (
              <Badge
                key={format}
                variant="secondary"
                className="text-xs text-muted-foreground cursor-default"
              >
                {format}
              </Badge>
            ))}
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
  },
);

// Add display name for better debugging
AssetUploadDialog.displayName = "AssetUploadDialog";
