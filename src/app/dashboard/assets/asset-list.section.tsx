"use client";

import { Image } from "@prisma/client";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { AssetsCard } from "./components/asset-list.card";
import { useAssetStore } from "@/stores/assets";
import { useEffect } from "react";

export default function AssetsListSection({
  initialAssets,
}: {
  initialAssets: Image[];
}) {
  const { assets, setAssets } = useAssetStore();

  useEffect(() => {
    setAssets(initialAssets);
  }, [initialAssets]);

  return (
    <DashboardCard
      title="Uploaded Assets"
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
