import { DashboardCard } from "@/components/layouts/dashboard-card";
import { validateAuthPage } from "@/utils/security/auth";

export default async function CampaignSection() {
  const user = await validateAuthPage();
  return (
    <DashboardCard
      title="Campaigns"
      description="Plan your next release strategy"
    >
      <div>Campaigns</div>
    </DashboardCard>
  );
}
