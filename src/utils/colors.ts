import ColorScheme from "color-scheme";

export function generateColorSchemeFromHex(
  hex: string,
  scheme: string,
  variation: string,
  numResults: number = 12,
): string[] {
  const [r, g, b] = hexToRgb(hex);
  const [hue, saturation, lightness] = rgbToHsl(r, g, b);
  return generateColorSchemeFromHue(hue, scheme, variation)
    .slice(0, numResults)
    .map((color) => `#${color}`);
}

function generateColorSchemeFromHue(
  hue: number,
  scheme: string,
  variation: string,
  numResults: number = 12,
): string[] {
  const colorScheme = new ColorScheme()
    .from_hue(hue)
    .scheme(scheme)
    .variation(variation);

  return colorScheme.colors().slice(0, numResults);
}

function hexToRgb(hex: string): [number, number, number] {
  // Remove the hash if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex string to RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }

  return [
    Math.round(h * 360), // Hue in degrees
    Math.round(s * 100), // Saturation in percentage
    Math.round(l * 100), // Lightness in percentage
  ];
}
