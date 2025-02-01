import { DashboardCard } from "@/components/layouts/dashboard-card";
import { validateAuthPage } from "@/utils/security/auth";

export default async function PipelineSection() {
  const user = await validateAuthPage();
  return (
    <DashboardCard
      title="Pipeline"
      description="Start planning your releases here"
    >
      <div>Pipeline</div>
    </DashboardCard>
  );
}
