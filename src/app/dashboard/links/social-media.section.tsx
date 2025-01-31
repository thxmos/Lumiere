"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { UserDto } from "@/actions/entities/user/createUser";
import { DashboardCard } from "@/components/layout/dashboard-card";
import { toast } from "sonner";
import { updateUser } from "@/actions/entities/user/updateUser";
import { useUserStore } from "@/stores/user";

export function SocialMediaSection({ initialUser }: { initialUser: UserDto }) {
  const { user, setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: SOCIAL_PLATFORMS.reduce(
      (acc, platform) => ({
        ...acc,
        [platform.value]: initialUser[platform.value as keyof UserDto] || "",
      }),
      {},
    ),
  });

  useEffect(() => {
    setUser(initialUser);

    return () => setUser(initialUser);
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await updateUser(data);
      setUser({ ...user, ...data });
      toast.success("Social media links updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update social media links:", error);
      toast.error("Failed to update social media links", {
        duration: 3000,
      });
    }
  };

  return (
    <DashboardCard
      title="Social Media"
      description="Manage your social media links here"
      footer={
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            form="social-media-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form
        id="social-media-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {SOCIAL_PLATFORMS.map((platform) => (
          <div key={platform.value} className="space-x-2 items-center flex">
            <platform.icon className="w-4 h-4 mr-2" />
            <Label htmlFor={platform.value} className="w-20">
              {platform.label}
            </Label>
            <Input
              id={platform.value}
              placeholder={
                platform.label !== "Apple Music" && platform.label !== "Spotify"
                  ? `Enter your ${platform.label} username`
                  : `Enter your ${platform.label} artist code`
              }
              {...register(platform.value as keyof typeof register)}
            />
          </div>
        ))}
      </form>
    </DashboardCard>
  );
}
