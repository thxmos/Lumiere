import { DashboardCard } from "@/components/dashboard-card";
import { ImageUploadForm } from "./assets-upload.form";

export const ImageUploadSection = () => {
  return (
    <DashboardCard
      title="Upload Image"
      description="Upload an image to your account"
    >
      <ImageUploadForm />
    </DashboardCard>
  );
};
