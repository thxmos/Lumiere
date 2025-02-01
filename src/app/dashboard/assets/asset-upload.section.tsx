import { DashboardCard } from "@/components/layouts/dashboard-card";
import { AssetUploadForm } from "./components/asset-upload.form";

export const AssetsUploadSection = () => {
  return (
    <DashboardCard
      title="Upload Assets"
      description="Upload assets here to use on your pages"
    >
      <AssetUploadForm />
    </DashboardCard>
  );
};
