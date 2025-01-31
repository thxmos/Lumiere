import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { BLACK, WHITE } from "@/constants/colors";
import {
  ColorSchemeType,
  ColorVariation,
  generateColorSchemeFromHex,
} from "@/utils/ui/colors";

interface ColorPaletteProps {
  themePrimaryColor: string;
  onSelectColor: (color: string) => void;
}

const sizeClasses = {
  sm: "w-12 h-12 min-w-12 min-h-12",
  md: "w-16 h-16 min-w-16 min-h-16",
  lg: "w-20 h-20 min-w-20 min-h-20",
};

export function ColorPalette({
  themePrimaryColor = "#000000",
  onSelectColor,
  // sizeClasses,
}: ColorPaletteProps) {
  const scheme = [
    themePrimaryColor,
    ...generateColorSchemeFromHex(
      themePrimaryColor,
      ColorSchemeType.TRIADE,
      ColorVariation.SOFT,
      7,
    ),
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

  const halfLength = scheme.length / 2;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {scheme.slice(0, halfLength).map((schemeColor) => (
          <Button
            key={schemeColor + uuidv4()}
            className={`${sizeClasses} rounded-md overflow-hidden border border-primary`}
            onClick={(e) => handleSelectColor(e, schemeColor)}
            aria-label={`Select color ${schemeColor}`}
            style={{ backgroundColor: schemeColor }}
          >
            <span className="sr-only">Select color {schemeColor}</span>
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {scheme.slice(halfLength).map((schemeColor) => (
          <Button
            key={schemeColor + uuidv4()}
            className={`${sizeClasses} rounded-md overflow-hidden border border-primary`}
            onClick={(e) => handleSelectColor(e, schemeColor)}
            aria-label={`Select color ${schemeColor}`}
            style={{ backgroundColor: schemeColor }}
          >
            <span className="sr-only">Select color {schemeColor}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
