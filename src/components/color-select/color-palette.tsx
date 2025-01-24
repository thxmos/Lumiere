import type React from "react";
import { Button } from "../ui/button";
import { BLACK, WHITE } from "@/constants/colors";
import { generateColorSchemeFromHex } from "@/utils/colors";

interface ColorPaletteProps {
  color: string;
  themePrimaryColor: string;
  onSelectColor: (color: string) => void;
  sizeClasses: string;
}

export function ColorPalette({
  color,
  themePrimaryColor = "#000000",
  onSelectColor,
  sizeClasses,
}: ColorPaletteProps) {
  const scheme = [
    themePrimaryColor,
    ...generateColorSchemeFromHex(themePrimaryColor, "triade", "light", 7),
    BLACK,
    WHITE,
  ];

  const handleSelectColor = (
    e: React.MouseEvent<HTMLButtonElement>,
    color: string,
  ) => {
    e.preventDefault();
    navigator.clipboard.writeText(color);
    onSelectColor(color);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {scheme.map((schemeColor, index) => (
        <Button
          key={index}
          className={`${sizeClasses} rounded-md overflow-hidden border border-primary`}
          onClick={(e) => handleSelectColor(e, schemeColor)}
          aria-label={`Select color ${schemeColor}`}
          style={{ backgroundColor: schemeColor }}
        >
          <span className="sr-only">Select color {schemeColor}</span>
        </Button>
      ))}
    </div>
  );
}
