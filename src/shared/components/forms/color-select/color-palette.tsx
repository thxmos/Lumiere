import type React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/shared/components/ui/button";
import { BLACK, WHITE } from "@/config/theme/colors";
import {
  ColorSchemeType,
  ColorVariation,
  generateColorSchemeFromHex,
} from "@/shared/utils/ui/colors";

interface ColorPaletteProps {
  themePrimaryColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorPalette({
  themePrimaryColor = "#000000",
  onSelectColor,
}: ColorPaletteProps) {
  const scheme = [
    themePrimaryColor,
    ...generateColorSchemeFromHex(
      themePrimaryColor,
      ColorSchemeType.TRIADE,
      ColorVariation.SOFT,
      9,
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
            className="w-7 h-7 min-w-7 min-h-7 rounded-md overflow-hidden border border-primary"
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
            className="w-7 h-7 min-w-7 min-h-7 rounded-md overflow-hidden border border-primary"
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
