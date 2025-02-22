"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { toast } from "sonner";
import { DashboardCard } from "@components/layouts/dashboard-card";
import { ColorSelect } from "@components/forms/color-select/color-select";
import { ColorPickerStandalone } from "@components/forms/color-select/color-picker-standalone";
import { Separator } from "@components/ui/separator";
import { useThemeStore } from "@stores/old/themes";
import { upsertTheme } from "@ulink/actions/theme/upsertTheme";
import { AssetResponse } from "@core/db/repositories/asset";
import { AssetType, Theme } from "@prisma/client";
import { FontSection } from "./font.form";
import { CardSection } from "./card.form";
import { BorderSection } from "./border.form";
import { PaintBucketIcon } from "lucide-react";
import { SelectInput } from "@components/forms/select-input";
import { WHITE } from "@/config/theme/colors";
import { Switch } from "@components/ui/switch";

/*
TODO: ThemePrimaryColor should be primaryColor
TODO: Pass in Color to ColorSelect for more colors
TODO: Seperate into section and form components
*/

const BACKGROUND_TYPES = [
  { label: "Colored Background", value: "color" },
  { label: "Image Background", value: "image" },
  { label: "Video Background", value: "video" },
];

export function ThemeEditorSection({
  initialTheme,
  assets,
}: {
  initialTheme: Theme;
  assets: AssetResponse[];
}) {
  const { control, handleSubmit, watch } = useForm<{
    theme: Theme;
  }>({
    defaultValues: { theme: initialTheme },
  });

  const { setTheme } = useThemeStore();

  const themeValues = useWatch({
    control,
    name: "theme",
  });

  useEffect(() => {
    return () => setTheme(initialTheme);
  }, []);

  useEffect(() => {
    setTheme(themeValues);
  }, [themeValues, setTheme]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const backgroundType =
    watch("theme.backgroundType") || BACKGROUND_TYPES[0].value;

  const onSubmit = async (data: { theme: Theme }) => {
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
        cardShadowSize: Number.parseInt(
          data.theme.cardShadowSize as unknown as string,
          10,
        ),
        cardShadowOffset: Number.parseInt(
          data.theme.cardShadowOffset as unknown as string,
          10,
        ),
        cardShadowDirection: Number.parseInt(
          data.theme.cardShadowDirection as unknown as string,
          10,
        ),
        cardShadowBlur: Number.parseInt(
          data.theme.cardShadowBlur as unknown as string,
          10,
        ),
      };
      await upsertTheme(updatedTheme);
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
      title={
        <div className="flex items-center gap-2">
          <PaintBucketIcon className="w-8 h-8" />
          Themes
        </div>
      }
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
              <Label className="w-24 font-bold">
                Primary <br />
                Color
              </Label>
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

          {/* Font Section */}
          <FontSection
            control={control}
            themePrimaryColor={watch("theme.primaryColor")}
          />

          {/* Border Section */}
          <BorderSection
            control={control}
            themePrimaryColor={watch("theme.primaryColor")}
          />

          {/* Card Section */}
          <CardSection
            control={control}
            themePrimaryColor={watch("theme.primaryColor")}
          />

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
                    value={value || ""}
                    themePrimaryColor={watch("theme.primaryColor")}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <Separator />
          </div>

          {/* Backgrounds */}
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

            {/* Color Background */}
            {backgroundType === "color" && (
              <>
                <div className="flex items-center space-x-2 mt-2">
                  <Label className="w-24 font-bold">Color</Label>
                  <Controller
                    name="theme.backgroundColor"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <ColorSelect
                        value={value || ""}
                        themePrimaryColor={
                          watch("theme.backgroundColor") ?? WHITE
                        }
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Controller
                    name="theme.gradient"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <Label className="w-24 font-bold">Gradient</Label>
                        <Switch
                          id="gradient"
                          checked={value}
                          onCheckedChange={onChange}
                        />
                      </>
                    )}
                  />
                </div>
                {watch("theme.gradient") && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Label className="w-24 font-bold">Gradient Color</Label>
                    <Controller
                      name="theme.gradientColor"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <ColorSelect
                          value={value || ""}
                          themePrimaryColor={
                            watch("theme.gradientColor") ?? WHITE
                          }
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                )}
              </>
            )}

            {/* Image Background */}
            {backgroundType === "image" && (
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24 font-bold">Image URL</Label>
                <Controller
                  name="theme.backgroundImageUrl"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    // <Input
                    //   type="text"
                    //   value={value || ""}
                    //   onChange={onChange}
                    // />
                    <SelectInput
                      options={assets
                        .filter((asset) => asset.type === AssetType.IMAGE)
                        .map((asset) => ({
                          label: asset.title ?? "Untitled",
                          value: asset.url,
                        }))}
                      placeholder="Select image asset"
                      onValueChange={onChange}
                      defaultValue={value ?? undefined}
                    />
                  )}
                />
              </div>
            )}

            {/* Video Background */}
            {backgroundType === "video" && (
              <div className="flex items-center space-x-2 mt-2">
                <Label className="w-24 font-bold">Video Asset</Label>
                <Controller
                  name="theme.videoUrl"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    // <Input
                    //   type="text"
                    //   value={value || ""}
                    //   onChange={onChange}
                    // />
                    <SelectInput
                      options={assets
                        .filter((asset) => asset.type === AssetType.VIDEO)
                        .map((asset) => ({
                          label: asset.title ?? "Untitled",
                          value: asset.url,
                        }))}
                      placeholder="Select video asset"
                      onValueChange={onChange}
                      defaultValue={value ?? undefined}
                    />
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
