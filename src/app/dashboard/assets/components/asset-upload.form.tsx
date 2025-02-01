"use client";

import { uploadAsset } from "@/actions/file-upload/createAsset";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/assets";
import { Image } from "@prisma/client";

export const AssetUploadForm = () => {
  const [preview, setPreview] = useState<string | null>(null); // base64 string of the image

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [asset, setAsset] = useState<File | null>(null); // The file that will be uploaded in the form
  const setAssets = useAssetStore((state) => state.setAssets);

  async function handleImageChange(file: File | null): Promise<void> {
    setAsset(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!asset) {
      toast.error("Please select an image");
      return;
    }

    try {
      // Cant send the form data directly to the action because the file is not serializable
      const formData = new FormData();
      formData.append("file", asset);
      formData.append("title", title);
      formData.append("description", description);

      const uploadedImage = await uploadAsset(formData);
      toast.success("Image uploaded successfully");

      setAssets([uploadedImage as Image, ...useAssetStore.getState().assets]);
      resetForm();
    } catch (error) {
      toast.error("Failed to upload image");
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPreview(null);
    setAsset(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <ImageUpload
          file={asset}
          setFile={setAsset}
          previewImg={preview || undefined}
          setPreviewImg={setPreview}
          onImageChange={handleImageChange}
          size="lg"
        />
      </div>
      <div className="flex flex-col gap-2 justify-between w-full">
        <div className="flex flex-col gap-2">
          <Label className="text-foreground font-bold">Image Title</Label>
          <Input
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label className="text-foreground font-bold">Image Description</Label>
          <Textarea
            className="h-24"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" className="flex gap-2 mt-2 self-end">
          <UploadIcon className="w-4 h-4" />
          Upload
        </Button>
      </div>
    </form>
  );
};
