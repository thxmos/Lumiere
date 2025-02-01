import { DashboardCard } from "@/components/layouts/dashboard-card";
import { AssetUploadForm } from "./components/asset-upload.form";

export const AssetsUploadSection = () => {
  return (
    <DashboardCard
      title="Upload Assets"
      description="Upload assets to your account"
    >
      <AssetUploadForm />
    </DashboardCard>
  );
};
