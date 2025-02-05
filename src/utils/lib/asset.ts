import { FileType } from "@/components/upload/file-upload";

export const getAssetBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};

export const getAssetType = (url: string | null) => {
  if (!url) return FileType.Image;

  const extension = url.split(".").pop()?.toLowerCase();
  if (!extension) return FileType.Image;

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return FileType.Image;
  }
  if (["mp4", "webm", "ogg", "mov"].includes(extension)) {
    return FileType.Video;
  }

  return FileType.Image;
};
