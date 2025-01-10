"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FONTS } from "@/constants";
import { upsertTheme } from "./themes.actions";
import { toast } from "sonner";
import { CreateThemeDto } from "@/data-access/theme";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Switch } from "@/components/ui/switch";
import { SelectInput } from "@/components/select-input/select-input";

export const THEME_FORM_FIELDS = [
  {
    category: "Font",
    fields: [
      { label: "Font Family", type: "select", name: "fontFamily" },
      { label: "Text Color", type: "color", name: "fontColor" },
      {
        label: "Secondary Text Color",
        type: "color",
        name: "secondaryColorFont",
      },
    ],
  },
  {
    category: "Background",
    fields: [
      { label: "Background Color", type: "color", name: "backgroundColor" },
      { label: "Background Image", type: "text", name: "backgroundImageUrl" },
      { label: "Video Background", type: "text", name: "videoUrl" },
      {
        label: "Video Background Active",
        type: "switch",
        name: "videoBackgroundActive",
      },
      {
        label: "Card Background Color",
        type: "color",
        name: "cardBackgroundColor",
      },
    ],
  },
  {
    category: "Border",
    fields: [
      { label: "Border Color", type: "color", name: "borderColor" },
      { label: "Border Radius", type: "number", name: "borderRadius" },
      { label: "Border Width", type: "number", name: "borderWidth" },
      { label: "Border Style", type: "select", name: "borderStyle" },
    ],
  },
];

export function ThemesCard({
  userId,
  initialTheme,
}: {
  userId: string;
  initialTheme: CreateThemeDto;
}) {
  const { register, handleSubmit, setValue } = useForm<{
    theme: CreateThemeDto;
  }>({
    defaultValues: { theme: initialTheme },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { theme: CreateThemeDto }) => {
    setIsSubmitting(true);
    try {
      await upsertTheme(userId, data.theme);
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

  const renderFormField = (
    field: (typeof THEME_FORM_FIELDS)[0]["fields"][0],
  ) => {
    switch (field.type) {
      case "select":
        return (
          <SelectInput
            options={
              field.name === "fontFamily"
                ? FONTS
                : [
                    { label: "Solid", value: "solid" },
                    { label: "Dashed", value: "dashed" },
                    { label: "Dotted", value: "dotted" },
                  ]
            }
            placeholder={`Select ${field.label.toLowerCase()}`}
            defaultValue={
              initialTheme[field.name as keyof CreateThemeDto] as string
            }
            onValueChange={(value) => setValue(`theme.${field.name}`, value)}
          />
        );
      case "switch":
        return (
          <Switch
            {...register(`theme.${field.name}`)}
            checked={
              initialTheme[field.name as keyof CreateThemeDto] as boolean
            }
          />
        );
      default:
        return <Input type={field.type} {...register(`theme.${field.name}`)} />;
    }
  };

  return (
    <DashboardCard
      title={<span>Themes</span>}
      description="Customize your theme settings here"
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
          {THEME_FORM_FIELDS.map((section) => (
            <div key={section.category} className="space-y-2">
              <Label className="text-lg font-bold">{section.category}</Label>
              {section.fields.map((field) => (
                <div
                  key={field.name}
                  className="flex items-center space-x-2 mt-2"
                >
                  <Label className="w-24">{field.label}</Label>
                  {renderFormField(field)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </form>
    </DashboardCard>
  );
}
