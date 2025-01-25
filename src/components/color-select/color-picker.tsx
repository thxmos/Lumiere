"use client";

import type React from "react";
import { useId, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  sizeClasses: string;
  standalone?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  sizeClasses,
  standalone = false,
}: ColorPickerProps) {
  const uniqueId = useId();
  const colorPickerId = `colorPicker-${uniqueId}`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!standalone) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        inputRef.current.blur();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [standalone]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newColor = e.target.value;
    onChange(newColor);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (standalone) {
      inputRef.current?.click();
    } else {
      onChange(value);
    }
  };

  return (
    <>
      <motion.button
        className={`${sizeClasses} rounded-md overflow-hidden border border-primary`}
        style={{ backgroundColor: value }}
        onClick={handleButtonClick}
        aria-label={standalone ? "Select color" : "Color selected"}
      />
      {standalone && (
        <input
          ref={inputRef}
          type="color"
          id={colorPickerId}
          value={value}
          onChange={handleColorChange}
          className="sr-only"
          aria-label="Color picker"
        />
      )}
    </>
  );
}
