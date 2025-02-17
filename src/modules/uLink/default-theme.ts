import { Theme } from "@prisma/client";
import { BLACK } from "../../config/theme/colors";
import { WHITE } from "../../config/theme/colors";

export const DEFAULT_THEME = {
  primaryColor: WHITE,
  secondaryColor: "#ffa500",
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
  borderRadius: 0,
  borderWidth: 0,
  borderStyle: "solid",
} as Theme;
