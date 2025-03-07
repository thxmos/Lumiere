import { DashboardCard } from "@components/layouts/dashboard-card";
import { validateAuthPage } from "@utils/security/auth";
import {
  CampaignWithActions,
  getUserMarketingDataFromDb,
} from "@foresight/actions/campaigns/getMarketingPlanFromDb";
import { PlanSelector } from "./plan-selector";
import { Campaign } from "@prisma/client";

export default async function PipelineSection() {
  await validateAuthPage();
  const response = await getUserMarketingDataFromDb();

  if (!response.success) {
    return (
      <DashboardCard
        title="Pipeline"
        description="Start planning your releases here"
      >
        <div className="text-red-500">Failed to load campaigns</div>
      </DashboardCard>
    );
  }

  const campaigns: Campaign[] = response.data ?? [];

  if (campaigns.length === 0) {
    return (
      <DashboardCard
        title="Pipeline"
        description="Start planning your releases here"
      >
        <div className="text-muted-foreground">
          No campaigns found. Create one from the Campaign tab.
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
        <PlanSelector campaigns={campaigns as CampaignWithActions[]} />
      </div>
    </DashboardCard>
  );
}
