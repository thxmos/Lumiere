import { DashboardCard } from "@/components/layouts/dashboard-card";
import { AssetUploadForm } from "./components/asset-upload.form";

export const AssetsUploadSection = () => {
  return (
    <DashboardCard
      title="Upload Assets"
      description="Supported filetypes: .png, .jpg, .jpeg, .gif, .mp4"
    >
      <AssetUploadForm />
    </DashboardCard>
  );
};
