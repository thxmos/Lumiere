import { DashboardCard } from "@/components/layouts/dashboard-card";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { UsersIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SocialMediaSection() {
  const [activePlatforms, setActivePlatforms] = useState<
    Record<string, boolean>
  >(
    Object.fromEntries(
      SOCIAL_PLATFORMS.map((platform) => [platform.value, false]),
    ),
  );

  const handleToggle = (platformValue: string) => {
    setActivePlatforms((prev) => ({
      ...prev,
      [platformValue]: !prev[platformValue],
    }));
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <UsersIcon className="w-8 h-8" />
          <p>Social Media</p>
        </div>
      }
      description="Manage which social media links you want to display"
      footer={
        <div className="flex w-full justify-end">
          <Button>
            <p>Save Changes</p>
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOCIAL_PLATFORMS.map((platform) => (
          <div
            key={platform.value}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <platform.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{platform.label}</span>
            </div>
            <Switch
              checked={activePlatforms[platform.value]}
              onCheckedChange={() => handleToggle(platform.value)}
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
