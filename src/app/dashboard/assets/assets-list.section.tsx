"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { AssetsCard } from "./assets-list.card";
import { useAssetStore } from "@/stores/assets";

export default function AssetsListSection() {
  const { assets, setAssets } = useAssetStore();

  console.log(assets);

  return (
    <DashboardCard
      title="Uploaded Assets"
      description={`Manage your images and videos ${assets.length}/20`}
    >
      <div className="flex flex-col justify-between gap-4">
        {assets.map((asset, index) => (
          <AssetsCard key={asset.id} asset={asset} index={index} />
        ))}
      </div>
    </DashboardCard>
  );
}
