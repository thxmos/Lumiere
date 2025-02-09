"use client";

import { DashboardCard } from "@/components/layouts/dashboard-card";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { UsersIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateLinkGroup } from "@/actions/entities/link/updateLinkGroup";
import { LinkGroupResponse } from "@/repositories/linkGroup/types";
import { toast } from "sonner";

export default function SocialMediaSection({
  linkGroup,
}: {
  linkGroup: LinkGroupResponse;
}) {
  const [activePlatforms, setActivePlatforms] = useState<
    Record<string, boolean>
  >(
    Object.fromEntries(
      SOCIAL_PLATFORMS.map((platform) => [
        platform.active,
        linkGroup[
          `${platform.active}Active` as
            | "appleMusicActive"
            | "facebookActive"
            | "instagramActive"
            | "patreonActive"
            | "spotifyActive"
            | "tiktokActive"
            | "twitterActive"
            | "youtubeActive"
        ] ?? false,
      ]),
    ),
  );

  const handleToggle = (platformActive: string) => {
    setActivePlatforms((prev) => ({
      ...prev,
      [platformActive]: !prev[platformActive],
    }));
  };

  const handleSave = async () => {
    try {
      await updateLinkGroup(linkGroup.id, {
        appleMusicActive: activePlatforms.appleMusic,
        facebookActive: activePlatforms.facebook,
        instagramActive: activePlatforms.instagram,
        patreonActive: activePlatforms.patreon,
        spotifyActive: activePlatforms.spotify,
        tiktokActive: activePlatforms.tiktok,
        twitterActive: activePlatforms.twitter,
        youtubeActive: activePlatforms.youtube,
      });
      toast.success("Link group updated successfully", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update link group", { duration: 3000 });
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <UsersIcon className="w-8 h-8" />
          <p>Social Media</p>
        </div>
      }
      description="Social media links will display if enabled and set in your profile"
      footer={
        <div className="flex w-full justify-end">
          <Button onClick={handleSave}>
            <p>Save Changes</p>
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOCIAL_PLATFORMS.map((platform) => (
          <div
            key={platform.active}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <platform.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{platform.label}</span>
            </div>
            <Switch
              checked={activePlatforms[platform.active]}
              onCheckedChange={() => handleToggle(platform.active)}
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
