"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AvatarUpload from "@/app/dashboard/ulink/_components/avatar-upload";
import type { UserDto } from "@/actions/entities/User/createUser";
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
import { updateUserAccountInfo } from "@/actions/entities/User/updateUserAccountInfo";
import { uploadAvatar } from "@/actions/file-upload/createAsset";
import { SettingsIcon } from "lucide-react";

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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const onSubmit = async (data: Partial<UserDto>) => {
    try {
      await updateUserAccountInfo(data);

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await uploadAvatar(formData);
      }

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
      title={
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" />
          Profile Info
        </div>
      }
      description="Manage your profile information here."
    >
      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <div className="flex gap-4 w-full">
          {/* Avatar */}
          <div className="flex flex-col items-center w-fit gap-4 pt-2">
            <Label>Avatar</Label>
            <AvatarUpload
              avatarFile={avatarFile}
              setAvatarFile={setAvatarFile}
              avatarUrl={user.avatar ?? ""}
            />
          </div>
          {/* Username and Description */}
          <div className="flex flex-col gap-4 w-full">
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
            {/* Description */}
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
            <div className="flex gap-4 items-center">
              {/* Country */}
              <div className="flex flex-col space-y-2 flex-1 max-w-[300px]">
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
              {/* Display Country */}
              <div className="flex gap-2 mt-4 items-center">
                <Switch
                  id="display-country"
                  {...register("displayCountry")}
                  checked={watch("displayCountry")}
                  onCheckedChange={(checked) =>
                    setValue("displayCountry", checked)
                  }
                />{" "}
                <Label htmlFor="display-country">Display Country</Label>
              </div>
            </div>
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
