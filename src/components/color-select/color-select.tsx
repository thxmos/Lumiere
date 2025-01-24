"use client";

import React from "react";
import { ColorPicker } from "./color-picker";
import { ColorPalette } from "./color-palette";

interface ColorSelectProps {
  value: string;
  themePrimaryColor: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

export function ColorSelect({
  value,
  themePrimaryColor,
  onChange,
  size = "md",
}: ColorSelectProps) {
  const handleColorChange = (color: string) => {
    onChange(color);
  };

  return (
    <div className="flex items-center space-x-4">
      <ColorPicker
        value={value}
        onChange={handleColorChange}
        sizeClasses={sizeClasses[size]}
      />
      <div className="w-px h-16 bg-primary" aria-hidden="true" />
      <div className="flex-grow">
        <ColorPalette
          color={value}
          themePrimaryColor={themePrimaryColor}
          onSelectColor={handleColorChange}
          sizeClasses={sizeClasses[size]}
        />
      </div>
    </div>
  );
}
