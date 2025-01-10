"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FONTS } from "@/constants";
import { upsertTheme } from "./themes.actions";
import { toast } from "sonner";
import { CreateThemeDto } from "@/data-access/theme";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";

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
          <div>
            <Label className="text-lg font-bold">Font</Label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Font Family</Label>
            <Select
              onValueChange={(value) => setValue("theme.fontFamily", value)}
              defaultValue={initialTheme.fontFamily}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Text Color</Label>
            <Input type="color" {...register("theme.fontColor")} />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Secondary Text Color</Label>
            <Input type="color" {...register("theme.secondaryColorFont")} />
          </div>
          <div className="mt-4">
            <Label className="text-lg font-bold">Background</Label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Background Color</Label>
            <Input type="color" {...register("theme.backgroundColor")} />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Background Image</Label>
            <Input
              type="text"
              placeholder="Enter image URL"
              {...register("theme.backgroundImage")}
            />
          </div>
          <div className="mt-4">
            <Label className="text-lg font-bold">Border</Label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Border Color</Label>
            <Input type="color" {...register("theme.borderColor")} />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Border Radius</Label>
            <Input
              type="number"
              {...register("theme.borderRadius", { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Border Width</Label>
            <Input
              type="number"
              {...register("theme.borderWidth", { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Label className="w-24">Border Style</Label>
            <Select
              onValueChange={(value) => setValue("theme.borderStyle", value)}
              defaultValue={initialTheme.borderStyle}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select border style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </DashboardCard>
  );
}
