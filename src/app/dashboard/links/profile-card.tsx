"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "@/components/avatar-upload/avatar-upload";
import Link from "next/link";
import { UserDto } from "@/data-access/user";
import { updateUser } from "./links.actions";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { toast } from "sonner";

interface ProfileInfoCardProps {
  user: UserDto;
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username,
      description: user.description || "",
    },
  });

  const onSubmit = async (data: { username: string; description: string }) => {
    try {
      await updateUser(user.id, data);
      toast.success("Profile updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile", {
        duration: 3000,
      });
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex justify-between items-center">
          <span>Profile Info</span>
          <Link href={`/${user.username}`} className="text-base underline">
            Preview
          </Link>
        </div>
      }
      description="Manage your profile information here"
    >
      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <AvatarUpload avatar={user.avatar || ""} name={user.name || ""} />
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("username", {
              required: "Username is required",
            })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && (
            <p className="text-sm text-red-500" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            rows={4}
            className="resize-none"
          />
        </div>
        <div className="flex justify-end w-full">
          <Button type="submit" form="profile-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </DashboardCard>
  );
}
