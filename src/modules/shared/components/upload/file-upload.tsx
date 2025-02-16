// 3

"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/modules/shared/components/ui/button";
import { Card, CardContent } from "@/modules/shared/components/ui/card";
import { UploadIcon, XIcon } from "lucide-react";
import { cn } from "@/utils/utils";

export enum FileType {
  Image = "Image",
  Video = "Video",
}

interface Props {
  file: File | null; // Current file state
  setFile: (file: File | null) => void; // Function to update file state
  onUpload: (file: File) => void; // Function called when upload button is clicked
  fileType: FileType; // Type of file (Image or Video)
  acceptedTypes: { [key: string]: any }; // Accepted MIME types
  maxSize?: number; // in MB
}

const FileUpload: React.FC<Props> = ({
  onUpload,
  fileType,
  acceptedTypes,
  file,
  setFile,
  maxSize = 20,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      const fileType = selectedFile.type;
      if (!acceptedTypes[fileType]) {
        setError(`Invalid file type: ${fileType}`);
        return;
      }

      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      setError(null);
    },
    [maxSize, acceptedTypes, setFile],
  );

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleFileUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            `${isDragActive && "bg-primary/10"}`,
          )}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              <PreviewComponent preview={preview} fileType={fileType} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 rounded-full "
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop a file here, or click to select a file
              </p>
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
        <Button
          className="w-full mt-4"
          disabled={!file}
          onClick={handleFileUpload}
        >
          Upload File
          {/* {uploading ? <BeatLoader size={10} /> : "Upload File"} */}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUpload;

const PreviewComponent = ({
  preview,
  fileType,
}: {
  preview: string;
  fileType: FileType;
}) => {
  if (!preview) return null;

  if (fileType === FileType.Image) {
    return (
      <img
        src={preview}
        alt="Preview"
        className="max-h-48 mx-auto rounded-lg"
      />
    );
  }

  if (fileType === FileType.Video) {
    return (
      <video
        src={preview}
        autoPlay
        muted
        loop
        className="max-h-48 w-full mx-auto rounded-lg"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return null;
};
