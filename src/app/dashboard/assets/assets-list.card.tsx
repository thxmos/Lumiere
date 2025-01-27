"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { ImageDtoWithId } from "@/types/image";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";
import { useState } from "react";
import { deleteImageAction } from "@/actions/image-upload.actions";
import { toast } from "sonner";
import { useAssetStore } from "@/stores/assets";

export function AssetsCard({
  asset,
  index,
}: {
  asset: ImageDtoWithId;
  index: number;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const setAssets = useAssetStore((state) => state.setAssets);

  async function handleConfirmDelete() {
    try {
      await deleteImageAction(asset.id);
      setIsDeleteModalOpen(false);
      toast.success("Asset deleted successfully", { duration: 3000 });

      setAssets(
        useAssetStore.getState().assets.filter((img) => img.id !== asset.id),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete asset", { duration: 3000 });
    }
  }

  return (
    <>
      <div
        key={asset.id}
        className="flex items-center justify-between border border-secondary rounded-md gap-4 p-2 hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <div className="text-sm text-primary font-bold">{index + 1}</div>
          <Image
            src={asset.url || "/placeholder.svg"}
            alt={asset.url}
            width={100}
            height={100}
            objectFit="cover"
            className="rounded-md border border-primary min-w-[100px] min-h-[100px]"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-primary">
              {asset.title || "Untitled"}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">File Type:</span>{" "}
              {asset.url ? "Image" : "Video"}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">File Size:</span>{" "}
              {asset.url ? "10MB" : "100MB"}
            </p>
          </div>
        </div>
        <X
          className="w-8 h-8 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
