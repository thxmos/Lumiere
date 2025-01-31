import { SocialMedia } from "@prisma/client";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaPatreon,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { FaApple } from "react-icons/fa6";

export type SocialMediaPlatform = {
  label: string;
  value: string;
  prefix: string;
  type: SocialMedia;
  icon: React.ElementType;
};

export const SOCIAL_PLATFORMS: SocialMediaPlatform[] = [
  {
    label: "Apple Music",
    value: "appleMusicUsername",
    prefix: "https://music.apple.com/us/artist/",
    type: "APPLE_MUSIC",
    icon: FaApple,
  },
  // {
  //   label: "Discord",
  //   value: "discordUsername",
  //   prefix: "https://discord.com/",
  //   icon: FaDiscord,
  // },
  {
    label: "Facebook",
    value: "facebookUsername",
    prefix: "https://facebook.com/",
    type: "FACEBOOK",
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    value: "instagramUsername",
    prefix: "https://instagram.com/",
    type: "INSTAGRAM",
    icon: FaInstagram,
  },
  {
    label: "Patreon",
    value: "patreonUsername",
    prefix: "https://patreon.com/",
    type: "PATREON",
    icon: FaPatreon,
  },
  {
    label: "Spotify",
    value: "spotifyUsername",
    prefix: "https://open.spotify.com/artist/",
    type: "SPOTIFY",
    icon: FaSpotify,
  },
  {
    label: "TikTok",
    value: "tiktokUsername",
    prefix: "https://tiktok.com/@",
    type: "TIKTOK",
    icon: FaTiktok,
  },
  {
    label: "Twitter/X",
    value: "twitterUsername",
    prefix: "https://x.com/",
    type: "TWITTER_X",
    icon: FaTwitter,
  },
  {
    label: "YouTube",
    value: "youtubeUsername",
    prefix: "https://youtube.com/",
    type: "YOUTUBE",
    icon: FaYoutube,
  },
];
