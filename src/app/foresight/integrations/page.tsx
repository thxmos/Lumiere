import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";

export default function Integrations() {
  return (
    <DashboardCard
      title="Integrations"
      description="Connect your other social media accounts to Lumiere"
    >
      {SOCIAL_PLATFORMS.map((platform) => (
        <div className="flex flex-col gap-4">
          <Label>{platform.label}</Label>
          <Button className="max-w-fit">
            <platform.icon className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      ))}
    </DashboardCard>
  );
}
