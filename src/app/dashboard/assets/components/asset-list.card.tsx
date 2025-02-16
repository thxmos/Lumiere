"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { ImageDtoWithId } from "@/modules/shared/types/entities/image";
import { ConfirmDeleteModal } from "@/app/dashboard/ulink/_components/modals/confirm-delete-modal";
import { useState } from "react";
import { deleteAssetById } from "@/actions/file-upload/deleteAsset";
import { toast } from "sonner";
import { AssetType } from "@prisma/client";
import { Badge } from "@/modules/shared/components/ui/badge";
import { Card } from "@/modules/shared/components/ui/card";
import { useAssetStore } from "@/modules/shared/stores/old/assets";

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
      await deleteAssetById(asset.id);
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
      <Card
        key={asset.id}
        className="flex items-center justify-between rounded-md gap-4 p-2"
      >
        <div className="flex items-center gap-4">
          <div className="text-sm text-primary font-bold">{index + 1}</div>
          {asset.type === AssetType.IMAGE ? (
            <Image
              src={asset.url || "/placeholder.svg"}
              alt={asset.url}
              width={100}
              height={100}
              objectFit="cover"
              className="rounded-md border border-primary max-w-[100px] max-h-[100px]"
            />
          ) : (
            <video
              src={asset.url}
              className="rounded-md border border-primary min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] object-cover"
              autoPlay
              muted
              loop
            />
          )}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-primary">
              {asset.title || "Untitled"}
            </p>
            <p className="text-sm text-muted-foreground">
              <Badge variant="outline">
                {asset.type === AssetType.IMAGE ? "Image" : "Video"}
              </Badge>
            </p>
            {/* <p className="text-sm text-muted-foreground">
              <span className="font-bold">File Size:</span>{" "}
              {asset.url ? "10MB" : "100MB"}
            </p> */}
          </div>
        </div>
        <X
          className="w-8 h-8 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </Card>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
