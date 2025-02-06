"use client";

import { uploadAsset } from "@/actions/file-upload/createAsset";
import { AssetUpload } from "@/components/upload/asset-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/assets";
import { Asset } from "@prisma/client";

import { FileType } from "@/components/upload/file-upload";
export const AssetUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [asset, setAsset] = useState<File | null>(null); // The file that will be uploaded in the form

  const setAssets = useAssetStore((state) => state.setAssets); //TODO: think I read this isn't the best way to do this

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

      setAssets([uploadedImage as Asset, ...useAssetStore.getState().assets]);
      resetForm();
    } catch (error) {
      toast.error("Failed to upload image");
    }
  }

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAsset(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex flex-col gap-2">
        <AssetUpload file={asset} setFile={setAsset} size="lg" />
      </div>
      <div className="flex flex-col gap-2 justify-between w-full">
        <div className="flex flex-col gap-2">
          <Label className="text-foreground font-bold">Title</Label>
          <Input
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label className="text-foreground font-bold">Description</Label>
          <Textarea
            className="h-24 resize-none"
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
