"use client";

import type React from "react";
import { useId } from "react";
import { motion } from "framer-motion";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  size: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

export function ColorPickerStandalone({
  value,
  onChange,
  size = "md",
}: ColorPickerProps) {
  const uniqueId = useId();
  const colorPickerId = `colorPicker-${uniqueId}`;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newColor = e.target.value;
    onChange(newColor);
  };

  return (
    <motion.button
      className={`${sizeClasses[size]} rounded-md overflow-hidden border border-primary relative`}
      style={{ backgroundColor: value }}
      aria-label="Select color"
    >
      <input
        type="color"
        id={colorPickerId}
        value={value}
        onChange={handleColorChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Color picker"
      />
    </motion.button>
  );
}
