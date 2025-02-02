import { DashboardCard } from "@/components/layouts/dashboard-card";
import { validateAuthPage } from "@/utils/security/auth";
import { getUserMarketingDataFromDb } from "@/actions/foresight/getMarketingPlanFromDb";
import { PlanSelector } from "./plan-selector";
import type { SongWithMarketing } from "@/actions/foresight/getMarketingPlanFromDb";

export default async function PipelineSection() {
  await validateAuthPage();
  const response = await getUserMarketingDataFromDb();

  if (!response.success) {
    return (
      <DashboardCard
        title="Pipeline"
        description="Start planning your releases here"
      >
        <div className="text-red-500">Failed to load marketing plans</div>
      </DashboardCard>
    );
  }

  const songs: SongWithMarketing[] = response.data ?? [];

  if (songs.length === 0) {
    return (
      <DashboardCard
        title="Pipeline"
        description="Start planning your releases here"
      >
        <div className="text-muted-foreground">
          No marketing plans found. Create one from the Campaign tab.
        </div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Pipeline"
      description="Start planning your releases here"
    >
      <div className="space-y-6">
        <PlanSelector songs={songs} />
      </div>
    </DashboardCard>
  );
}
