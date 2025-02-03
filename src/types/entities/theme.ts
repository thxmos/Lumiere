import { Theme } from "@prisma/client";

export type ThemeNoId = Omit<Theme, "id">;

export type CreateThemeDto = {
  userId: string;
  primaryColor: string;

  fontFamily: string;
  fontWeight: number;
  fontColor: string;
  secondaryColorFont: string;

  borderColor: string;
  borderRadius: number;
  borderWidth: number;
  borderStyle: string;

  cardBackgroundColor: string;
  cardShadowSize: number;
  cardShadowOffset: number;
  cardShadowDirection: number;
  cardShadowBlur: number;
  cardShadowColor: string;
  iconColor: string;

  backgroundType: string; // "color" | "image" | "video"
  backgroundColor: string;
  backgroundImageUrl: string;
  videoUrl: string;
};

export type ThemeDto = CreateThemeDto & {
  id: string;
};
