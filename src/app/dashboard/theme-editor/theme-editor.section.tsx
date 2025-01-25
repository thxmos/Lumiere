"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FONTS } from "@/constants/fonts";
import { upsertTheme } from "./themes.actions";
import { toast } from "sonner";
import type { CreateThemeDto } from "@/data-access/theme";
import { DashboardCard } from "@/components/dashboard-card";
import { SelectInput } from "@/components/select-input";
import { ColorSelect } from "@/components/color-select/color-select";
import { ColorPickerStandalone } from "@/components/color-select/color-picker-standalone";
import { Separator } from "@/components/ui/separator";

const BACKGROUND_TYPES = [
  { label: "Colored Background", value: "color" },
  { label: "Image Background", value: "image" },
  { label: "Video Background", value: "video" },
];

export function ThemeEditorSection({
  userId,
  initialTheme,
}: {
  userId: string;
  initialTheme: Omit<CreateThemeDto, "userId">;
}) {
  const { control, handleSubmit, watch } = useForm<{
    theme: Omit<CreateThemeDto, "userId">;
  }>({
    defaultValues: { theme: initialTheme },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const backgroundType =
    watch("theme.backgroundType") || BACKGROUND_TYPES[0].value;

  const onSubmit = async (data: { theme: Omit<CreateThemeDto, "userId"> }) => {
    setIsSubmitting(true);
    try {
      const updatedTheme = {
        ...data.theme,
        borderRadius: Number.parseInt(
          data.theme.borderRadius as unknown as string,
          10,
        ),
        borderWidth: Number.parseInt(
          data.theme.borderWidth as unknown as string,
          10,
        ),
      };
      await upsertTheme(userId, updatedTheme);
      toast.success("Theme updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update theme:", error);
      toast.error("Failed to update theme", {
        duration: 3000,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <DashboardCard
      title={<span>Themes</span>}
      description="Customize your brand theme settings here. These will be applied to all your pages"
      footer={
        <div className="flex justify-end w-full">
          <Button type="submit" form="theme-form" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      }
    >
      <form
        id="theme-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="space-y-4">
          {/* Color Palette */}
          <div className="space-y-4">
            <Label className="text-lg font-bold">Color Palette</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Primary Color</Label>
              <Controller
                name="theme.primaryColor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorPickerStandalone value={value} onChange={onChange} />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Font */}
          <div className="space-y-4">
            <Label className="text-lg font-bold">Font</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Font Family</Label>
              <Controller
                name="theme.fontFamily"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={FONTS}
                    placeholder="Select font family"
                    onValueChange={onChange}
                    defaultValue={value || FONTS[0].value}
                  />
                )}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Text Color</Label>
              <Controller
                name="theme.fontColor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorSelect
                    value={value}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Secondary Text Color</Label>
              <Controller
                name="theme.secondaryColorFont"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorSelect
                    value={value}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Border */}
          <div className="space-y-4">
            <Label className="text-lg font-bold">Border</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Border Color</Label>
              <Controller
                name="theme.borderColor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorSelect
                    value={value}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Border Radius</Label>
              <Controller
                name="theme.borderRadius"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      onChange(Number.parseInt(e.target.value, 10))
                    }
                  />
                )}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Border Width</Label>
              <Controller
                name="theme.borderWidth"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      onChange(Number.parseInt(e.target.value, 10))
                    }
                  />
                )}
              />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Border Style</Label>
              <Controller
                name="theme.borderStyle"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={[
                      { label: "Solid", value: "solid" },
                      { label: "Dashed", value: "dashed" },
                      { label: "Dotted", value: "dotted" },
                    ]}
                    placeholder="Select border style"
                    onValueChange={onChange}
                    defaultValue={value}
                  />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Card */}
          <div className="space-y-4">
            <Label className="text-lg font-bold">Card</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Background Color</Label>
              <Controller
                name="theme.cardBackgroundColor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorSelect
                    value={value}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Icon */}
          <div className="space-y-4">
            <Label className="text-lg font-bold">Icon</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Icon Color</Label>
              <Controller
                name="theme.iconColor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ColorSelect
                    value={value}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Background */}
          <div className="space-y-2">
            <Label className="text-lg font-bold">Background</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Label className="w-24 font-bold">Type</Label>
              <Controller
                name="theme.backgroundType"
                control={control}
                defaultValue={BACKGROUND_TYPES[0].value}
                render={({ field: { onChange, value } }) => (
                  <SelectInput
                    options={BACKGROUND_TYPES}
                    placeholder="Select background type"
                    onValueChange={onChange}
                    defaultValue={value}
                  />
                )}
              />
            </div>

            {backgroundType === "color" && (
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24 font-bold">Color</Label>
                <Controller
                  name="theme.backgroundColor"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ColorSelect
                      value={value}
                      themePrimaryColor={watch("theme.primaryColor")}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            )}

            {backgroundType === "image" && (
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24 font-bold">Image URL</Label>
                <Controller
                  name="theme.backgroundImageUrl"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input type="text" value={value} onChange={onChange} />
                  )}
                />
              </div>
            )}

            {backgroundType === "video" && (
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24 font-bold">Video URL</Label>
                <Controller
                  name="theme.videoUrl"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input type="text" value={value} onChange={onChange} />
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </DashboardCard>
  );
}
