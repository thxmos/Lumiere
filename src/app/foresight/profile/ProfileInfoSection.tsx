import Image from "next/image";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { validateAuthPage } from "@/utils/security/auth";
import { GRADIENT_STYLES } from "@/constants/ui/styles";
import {
  BarChart3Icon,
  BrainIcon,
  PlusIcon,
  SeparatorVertical,
  SwordsIcon,
  ThermometerIcon,
  TrendingUpIcon,
  UsersIcon,
  WeightIcon,
} from "lucide-react";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { cn } from "@/utils/utils";

export default async function ProfileInfoSection() {
  const user = await validateAuthPage();

  return (
    <DashboardCard title="Profile" description="Your profile information">
      <>
        <div className="flex justify-between">
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="max-w-[100px] max-h-[100px]">
              <Image
                src={user.avatar!} // TODO: add fallback img
                alt="User avatar"
                width={100}
                height={100}
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
                  {/* TODO: add logic to determine if trending up or down */}
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
                <platform.icon key={platform.label} />
              ))}
              <PlusIcon className="w-4 h-4 cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
      </>
    </DashboardCard>
  );
}
