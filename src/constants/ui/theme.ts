import type { ThemeNoId } from "@/types/entities/theme";
import { BLACK } from "@/constants/ui/colors";
import { WHITE } from "@/constants/ui/colors";

//TODO: Clean up shadcn themes, associate each theme with the color below and map through where needed
export const SHADCN_THEMES = [
  "light",
  "dark",
  "bean",
  "blue",
  "green",
  "purple",
  "purple-dark",
  "orange",
  "pink",
  "teal",
  "teal-light",
];

export const THEMES = [
  { name: "light", color: "#ffffff" },
  { name: "dark", color: "#1f2937" },
  { name: "blue", color: "#3b82f6" },
  { name: "green", color: "#10b981" },
  { name: "purple", color: "#8b5cf6" },
  { name: "orange", color: "#f97316" },
  { name: "pink", color: "#ec4899" },
  { name: "teal", color: "#14b8a6" },
];

export const DEFAULT_THEME = {
  primaryColor: WHITE,
  secondaryColor: "#3f1f4a",
  fontFamily: "Arial",
  fontWeight: 400,
  fontColor: BLACK,
  secondaryColorFont: WHITE,
  backgroundType: "color",
  backgroundColor: WHITE,
  gradient: false,
  gradientColor: WHITE,
  backgroundImageUrl: "",
  videoUrl: "",
  cardBackgroundColor: WHITE,
  cardTextColor: BLACK,
  cardShadowSize: 0,
  cardShadowOffset: 0,
  cardShadowDirection: 0,
  cardShadowBlur: 0,
  cardShadowColor: BLACK,
  iconColor: WHITE,
  borderColor: BLACK,
  borderRadius: 0,
  borderWidth: 0,
  borderStyle: "solid",
} as ThemeNoId;
