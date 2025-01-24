import React from "react";
import { Button } from "./ui/button";
import { BLACK, WHITE } from "@/constants/colors";

interface ColorPaletteProps {
  colors?: string[];
}

const defaultColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  BLACK,
  WHITE,
];

export function ColorPalette({ colors = defaultColors }: ColorPaletteProps) {
  const handleSelectColor = (
    e: React.MouseEvent<HTMLButtonElement>,
    color: string,
  ) => {
    e.preventDefault();
    navigator.clipboard.writeText(color);
    // set the form value to the color
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {colors.map((color, index) => (
        <div
          key={index}
          className="w-16 h-16 rounded-lg transition-transform hover:scale-110 border border-primary"
        >
          <Button
            className="w-full h-full bg-transparent"
            onClick={(e) => handleSelectColor(e, color)}
            aria-label={`Select color ${color}`}
            style={{ backgroundColor: color }}
          >
            <span className="sr-only">Select color {color}</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
