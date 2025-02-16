"use client";

import Image from "next/image";
import { DashboardCard } from "@/modules/shared/components/layouts/dashboard-card";
import { Label } from "@/modules/shared/components/ui/label";
import { GRADIENT_STYLES } from "@/config/theme/styles";
import {
  BarChart3Icon,
  BrainIcon,
  PlusIcon,
  SwordsIcon,
  ThermometerIcon,
  TrendingUpIcon,
  UsersIcon,
  WeightIcon,
} from "lucide-react";
import { SOCIAL_PLATFORMS } from "@/config/constants/social-media";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { SocialMediaIntegrationsMenu } from "./IntegrationsMenu";
import { IntegrationDetailsModal } from "./IntegrationDetailsModal";
import { toast } from "sonner";
import { UserResponse } from "@/modules/shared/core/db/repositories/user";

export interface ProfileInfoSectionProps {
  user: UserResponse;
}

export const ProfileInfoSection = ({ user }: ProfileInfoSectionProps) => {
  const [isIntegrationsModalOpen, setIsIntegrationsModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<
    (typeof SOCIAL_PLATFORMS)[number] | null
  >(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handlePlatformClick = (platform: (typeof SOCIAL_PLATFORMS)[number]) => {
    setSelectedPlatform(platform);
    setIsDetailsModalOpen(true);
  };

  const handleSocialAuthSuccess = () => {
    setIsIntegrationsModalOpen(false);
    toast.success("Successfully connected social media account");
  };

  const handleSocialAuthError = (error: Error) => {
    console.error("Social authentication error:", error);
    toast.error("Failed to connect social media account");
  };

  return (
    <DashboardCard title="" description="">
      <div className="flex justify-between p-6">
        {/* User info */}
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="User avatar"
              fill
              className="rounded-sm border border-primary object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className={`text-2xl font-bold ${GRADIENT_STYLES}`}>
              {user.username}
            </Label>
            <div className="grid grid-flow-col grid-rows-4 gap-4">
              <Label className="flex items-center gap-2">
                <SwordsIcon className="w-4 h-4" />
                <span className="font-bold">Completed:</span> 0/10
              </Label>
              <Label className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4" />
                <span className="font-bold">Followers:</span> 69,420
              </Label>
              <Label className="flex items-center gap-2">
                <BrainIcon className="w-4 h-4" />
                <span className="font-bold">Strategy:</span>{" "}
                {user.strategyType || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <WeightIcon className="w-4 h-4" />
                <span className="font-bold">Commitment:</span>{" "}
                {user.commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <ThermometerIcon className="w-4 h-4" />
                <span className="font-bold">Buzz:</span>{" "}
                {user.commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <BarChart3Icon className="w-4 h-4" />
                <span className="font-bold">Most Reach:</span>{" "}
                {user.commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="font-bold">Trending:</span>{" "}
                <span
                  className={cn(
                    !user.commitment ? "text-green-500" : "text-red-500",
                  )}
                >
                  {!user.commitment ? "Up" : "Down"}
                </span>
              </Label>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-bold">Integrations</Label>
          <div className="grid grid-cols-3 gap-4">
            {SOCIAL_PLATFORMS.map((platform) => (
              <div
                key={platform.label}
                onClick={() => handlePlatformClick(platform)}
                className="cursor-pointer"
              >
                <platform.icon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
              </div>
            ))}
            <PlusIcon
              className="w-6 h-6 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsIntegrationsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <SocialMediaIntegrationsMenu
        isOpen={isIntegrationsModalOpen}
        onClose={() => setIsIntegrationsModalOpen(false)}
        onSuccess={handleSocialAuthSuccess}
        onError={handleSocialAuthError}
      />

      {selectedPlatform && (
        <IntegrationDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedPlatform(null);
          }}
          platform={selectedPlatform}
        />
      )}
    </DashboardCard>
  );
};

export default ProfileInfoSection;
