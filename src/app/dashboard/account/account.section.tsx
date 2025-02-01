"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "@/app/dashboard/_components/avatar-upload";
import type { UserDto } from "@/actions/entities/user/createUser";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/constants/countries";
import { Switch } from "@/components/ui/switch";
import { updateUserAccountInfoAction } from "@/actions/entities/user/updateUserAccountInfoAction";

export function AccountSection({ user }: { user: UserDto }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      username: user.username,
      description: user.description || "",
      country: user.country || "",
      displayCountry: user.displayCountry,
    },
  });

  const onSubmit = async (data: Partial<UserDto>) => {
    try {
      await updateUserAccountInfoAction(data);
      toast.success("Profile updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to update profile. " + error, {
        duration: 3000,
      });
    }
  };

  return (
    <DashboardCard
      title="Profile Info"
      description="Manage your profile information here."
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
              pattern: {
                value: /^[a-zA-Z0-9\-]+$/,
                message:
                  "Username can only contain letters, numbers, and hyphens",
              },
            })}
            minLength={3}
            maxLength={69}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && (
            <p className="text-sm text-red-500" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">
            Description ({watch("description")?.length || 0}/150)
          </Label>
          <Textarea
            id="description"
            {...register("description", {
              maxLength: {
                value: 150,
                message: "Description cannot exceed 150 characters",
              },
            })}
            rows={4}
            className="resize-none"
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p className="text-sm text-red-500" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-2 flex-1">
            <Label htmlFor="country">Country</Label>
            <Select
              onValueChange={(value) => setValue("country", value)}
              defaultValue={user.country || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.emoji} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="display-country"
              {...register("displayCountry")}
              checked={watch("displayCountry")}
              onCheckedChange={(checked) => setValue("displayCountry", checked)}
            />{" "}
            <Label htmlFor="display-country">Display Country</Label>
          </div>
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
