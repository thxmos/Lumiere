import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";

// TODO:Put this in a dropdown menu with each social media and open a modal or something
export default function SocialIntegrationsSection() {
  return (
    <DashboardCard
      title="Integrations"
      description="Connect your other social media accounts to Lumiere"
    >
      <div className="grid grid-cols-2 gap-6">
        {SOCIAL_PLATFORMS.map((platform) => (
          <div className="flex flex-col gap-4" key={platform.label}>
            <Label>{platform.label}</Label>
            <Button className="max-w-fit">
              <platform.icon className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
