"use client";

import { uploadProductImage } from "@/actions/file-upload/image-upload";
import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/assets";

export const ImageUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const setAssets = useAssetStore((state) => state.setAssets);

  async function handleImageChange(newImage: string | null): Promise<void> {
    setImage(newImage);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const file = new File([image], "image.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadedImage = await uploadProductImage(formData, {
        url: image,
        title,
        description,
      });
      toast.success("Image uploaded successfully");

      setAssets([uploadedImage, ...useAssetStore.getState().assets]);

      resetForm();
    } catch (error) {
      toast.error("Failed to upload image");
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setImage(null);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <ImageUpload onImageChange={handleImageChange} size="lg" />
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
