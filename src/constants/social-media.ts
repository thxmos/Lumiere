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

export const SOCIAL_PLATFORMS = [
  {
    label: "Apple Music",
    value: "appleMusicUsername",
    prefix: "https://applemusic.com/",
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
    icon: FaFacebook,
  },
  {
    label: "Instagram",
    value: "instagramUsername",
    prefix: "https://instagram.com/",
    icon: FaInstagram,
  },
  {
    label: "Patreon",
    value: "patreonUsername",
    prefix: "https://patreon.com/",
    icon: FaPatreon,
  },
  {
    label: "Spotify",
    value: "spotifyUsername",
    prefix: "https://spotify.com/",
    icon: FaSpotify,
  },
  {
    label: "TikTok",
    value: "tiktokUsername",
    prefix: "https://tiktok.com/",
    icon: FaTiktok,
  },
  {
    label: "Twitter/X",
    value: "twitterUsername",
    prefix: "https://twitter.com/",
    icon: FaTwitter,
  },
  {
    label: "YouTube",
    value: "youtubeUsername",
    prefix: "https://youtube.com/",
    icon: FaYoutube,
  },
];
