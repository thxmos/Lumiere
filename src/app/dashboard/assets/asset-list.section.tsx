"use client";

import { Asset } from "@prisma/client";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { AssetsCard } from "./components/asset-list.card";
import { useAssetStore } from "@/stores/old/assets";
import { useEffect } from "react";
import { ImagesIcon } from "lucide-react";

export default function AssetsListSection({
  initialAssets,
}: {
  initialAssets: Asset[];
}) {
  const { assets, setAssets } = useAssetStore();

  useEffect(() => {
    setAssets(initialAssets);
  }, [initialAssets]);

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <ImagesIcon className="w-8 h-8" />
          Uploaded Assets
        </div>
      }
      description={`Manage your images and videos (${assets.length}/20)`}
    >
      <div className="flex flex-col justify-between gap-4">
        {assets.map((asset, index) => (
          <AssetsCard key={asset.id} asset={asset} index={index} />
        ))}
      </div>
    </DashboardCard>
  );
}
