import { CreateThemeDto, ThemeNoId } from "@/data-access/theme";
import { BLACK } from "@/constants/colors";
import { WHITE } from "@/constants/colors";

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
  fontFamily: "Arial",
  fontWeight: 400,
  fontColor: BLACK,
  secondaryColorFont: WHITE,
  backgroundType: "color",
  backgroundColor: WHITE,
  backgroundImageUrl: "",
  videoUrl: "",
  cardBackgroundColor: WHITE,
  iconColor: WHITE,
  borderColor: BLACK,
  borderRadius: 0,
  borderWidth: 0,
  borderStyle: "solid",
} as ThemeNoId;
