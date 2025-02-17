import { DashboardCard } from "@/shared/components/layouts/dashboard-card";
import { AssetUploadForm } from "./components/asset-upload.form";
import { ImageIcon, ImagePlusIcon } from "lucide-react";

export const AssetsUploadSection = () => {
  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <ImagePlusIcon className="w-8 h-8" />
          Upload Assets
        </div>
      }
      description="Upload assets here to use on your pages"
    >
      <AssetUploadForm />
    </DashboardCard>
  );
};
