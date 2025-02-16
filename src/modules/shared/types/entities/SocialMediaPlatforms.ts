import { SocialMedia } from "@prisma/client";

export type SocialMediaPlatform = {
  label: string;
  value: string;
  active: string; // Just using this for LinkGroup active fields, should just make value and active combined and attach whatever postfix is needed
  prefix: string;
  type: SocialMedia;
  icon: React.ElementType;
};
