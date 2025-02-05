"use client";

import Image from "next/image";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Label } from "@/components/ui/label";
import { GRADIENT_STYLES } from "@/constants/ui/styles";
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
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { SocialMediaIntegrationsMenu } from "./integrations-menu";
import { SessionUser } from "@/utils/lib/lucia";
import { Commitment, StrategyType } from "@prisma/client";
import { toast } from "sonner";

export interface ProfileInfoSectionProps {
  user: SessionUser;
  commitment: Commitment | null;
  strategyType: StrategyType | null;
}

export const ProfileInfoSection = ({
  user,
  commitment,
  strategyType,
}: ProfileInfoSectionProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleSocialAuthSuccess = () => {
    setOpenModal(false);
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
                {strategyType || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <WeightIcon className="w-4 h-4" />
                <span className="font-bold">Commitment:</span>{" "}
                {commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <ThermometerIcon className="w-4 h-4" />
                <span className="font-bold">Buzz:</span> {commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <BarChart3Icon className="w-4 h-4" />
                <span className="font-bold">Most Reach:</span>{" "}
                {commitment || "None"}
              </Label>
              <Label className="flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="font-bold">Trending:</span>{" "}
                <span
                  className={cn(
                    !commitment ? "text-green-500" : "text-red-500",
                  )}
                >
                  {!commitment ? "Up" : "Down"}
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
              <platform.icon
                key={platform.label}
                className="w-6 h-6 text-gray-600 hover:text-primary transition-colors cursor-pointer"
              />
            ))}
            <PlusIcon
              className="w-6 h-6 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
      </div>

      <SocialMediaIntegrationsMenu
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSocialAuthSuccess}
        onError={handleSocialAuthError}
      />
    </DashboardCard>
  );
};

export default ProfileInfoSection;
