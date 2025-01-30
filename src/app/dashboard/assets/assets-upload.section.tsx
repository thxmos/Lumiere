import { DashboardCard } from "@/components/dashboard-card";
import { ImageUploadForm } from "./components/assets-upload.form";

export const AssetsUploadSection = () => {
  return (
    <DashboardCard
      title="Upload Assets"
      description="Upload assets to your account"
    >
      <ImageUploadForm />
    </DashboardCard>
  );
};
