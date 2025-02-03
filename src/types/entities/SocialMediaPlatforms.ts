import { SocialMedia } from "@prisma/client";

export type SocialMediaPlatform = {
  label: string;
  value: string;
  prefix: string;
  type: SocialMedia;
  icon: React.ElementType;
};
