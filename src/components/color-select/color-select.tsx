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
  sm: "w-8 h-8 min-w-8 min-h-8",
  md: "w-12 h-12 min-w-12 min-h-12",
  lg: "w-16 h-16 min-w-16 min-h-16",
};

export function ColorSelect({
  value,
  themePrimaryColor,
  onChange,
  size = "lg",
}: ColorSelectProps) {
  const handleColorChange = (color: string) => {
    onChange(color);
  };

  const getHeightFromSize = (size: "sm" | "md" | "lg") => {
    return sizeClasses[size].split(" ")[1];
  };

  return (
    <div className="flex items-center space-x-4" style={{ margin: 0 }}>
      <ColorPicker
        value={value}
        onChange={handleColorChange}
        sizeClasses={sizeClasses[size]}
      />
      <div
        className={`w-px ${getHeightFromSize(size)} bg-primary`}
        aria-hidden="true"
      />
      <div className="flex-grow">
        <ColorPalette
          themePrimaryColor={themePrimaryColor}
          onSelectColor={handleColorChange}
          // sizeClasses={sizeClasses[size]}
        />
      </div>
    </div>
  );
}
