"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { PLACEHOLDER_IMG } from "@/config/theme/images";
import type { LinkDtoWithId } from "@s-types/links";
import type { ThemeNoId } from "@s-types/entities/theme";
import { useThemeStore } from "@stores/old/themes";
import { useLinksStore } from "@stores/old/links";
import { BLACK, WHITE } from "@/config/theme/colors";
import { COUNTRIES } from "@/config/constants/countries";
import { TabSelector } from "./components/tab-selector";
import { SOCIAL_PLATFORMS } from "@/config/constants/social-media";
import { cn } from "@utils/utils";
import { DEFAULT_FONT } from "@/config/theme/fonts";
import { ColoredBackground } from "./components/backgrounds/background-color";
import VideoBackground from "./components/backgrounds/background-video";
import { ImageBackground } from "./components/backgrounds/background-image";
import { createClickSocial } from "@/modules/uLink/actions/link-click/createClickSocial";
import { SocialMedia } from "@prisma/client";
import { UserResponse } from "@core/db/repositories/user";
import { LinkGroupWithLinks } from "@core/db/repositories/linkGroup";

type CardShadow = {
  cardShadowSize?: number | null;
  cardShadowColor?: string | null;
  cardShadowOffset?: number | null;
  cardShadowDirection?: number | null;
  cardShadowBlur?: number | null;
};

// Add this helper function to generate the shadow CSS
const generateShadowStyle = (theme: ThemeNoId & CardShadow) => {
  if (!theme.cardShadowSize || !theme.cardShadowColor) return {};

  const offsetX = theme.cardShadowOffset
    ? Math.cos(((theme.cardShadowDirection || 0) * Math.PI) / 180) *
      theme.cardShadowOffset
    : 0;
  const offsetY = theme.cardShadowOffset
    ? Math.sin(((theme.cardShadowDirection || 0) * Math.PI) / 180) *
      theme.cardShadowOffset
    : 0;

  return {
    boxShadow: `${offsetX}px ${offsetY}px ${theme.cardShadowBlur || 0}px ${theme.cardShadowSize}px ${theme.cardShadowColor}`,
  };
};

interface Props {
  isPreview?: boolean;
  isMobilePreview?: boolean;
  initialLinkGroup: LinkGroupWithLinks | null;
  initialTheme: ThemeNoId;
  user: UserResponse;
}

export default function LinkTree({
  isPreview = false,
  isMobilePreview = false,
  initialTheme,
  initialLinkGroup,
  user,
}: Props) {
  const [localTheme, setlocalTheme] = useState<ThemeNoId | null>(initialTheme);
  const [localLinks, setLocalLinks] = useState<LinkDtoWithId[]>(
    initialLinkGroup?.Links || [],
  );

  const { theme, setTheme } = useThemeStore();
  const { links, setLinks } = useLinksStore();

  useEffect(() => {
    setTheme(initialTheme);
    setLinks(initialLinkGroup?.Links || []);
  }, []);

  useEffect(() => {
    if (!isPreview) return;

    if (theme) setlocalTheme(theme);
    if (links) setLocalLinks(links);
  }, [theme, links]);

  const previewStyles = {
    wrapper: {},
    avatarSize: 80,
    usernameSize: "text-2xl",
    iconSize: 16,
  };
  const styles = {
    wrapper: {},
    avatarSize: 100,
    usernameSize: "text-3xl",
    iconSize: 24,
  };

  /*
   * handleIconClick()
   *
   * Create new Click entity for social media icon click only if not in preview mode
   */

  const handleIconClick = (socialPlatform: SocialMedia) => {
    if (isPreview) return;
    const browserData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      referrer: document.referrer || "",
      browser: navigator.userAgent,
      browserVersion: navigator.appVersion,
      operatingSystem: navigator.platform,
      deviceType: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    createClickSocial(user.username, socialPlatform, browserData);
  };

  return (
    <div
      className={cn("relative overflow-hidden", {
        "min-h-screen": !isPreview,
      })}
      style={{
        fontFamily: localTheme?.fontFamily || DEFAULT_FONT,
      }}
    >
      {/* Backgrounds */}
      {localTheme?.backgroundType === "color" && (
        <ColoredBackground localTheme={localTheme} />
      )}
      {localTheme?.backgroundType === "image" && (
        <ImageBackground localTheme={localTheme} />
      )}
      {localTheme?.backgroundType === "video" && (
        <VideoBackground localTheme={localTheme} />
      )}

      <div
        className={cn("relative z-10 px-4 py-16 flex flex-col", {
          "min-h-screen": !isMobilePreview,
          "min-h-[calc(65vh)]": isMobilePreview,
        })}
      >
        <div className="max-w-md mx-auto flex-grow">
          {/* Profile Info */}
          <div className="flex items-center mb-6 justify-center">
            <Image
              src={user.avatar || PLACEHOLDER_IMG}
              alt="Profile Picture"
              width={
                isMobilePreview ? previewStyles.avatarSize : styles.avatarSize
              }
              height={
                isMobilePreview ? previewStyles.avatarSize : styles.avatarSize
              }
              className="rounded-full border-2 border-gray-200 flex-shrink-0"
              style={{
                borderColor: localTheme?.borderColor || BLACK,
                borderWidth: localTheme?.borderWidth
                  ? `${localTheme?.borderWidth}px`
                  : 1,
                borderStyle: localTheme?.borderStyle || "solid",
              }}
            />
            <div className="ml-4 flex flex-col items-start">
              <span className="flex items-end">
                <h1
                  className={cn(
                    "font-bold",
                    isMobilePreview
                      ? previewStyles.usernameSize
                      : styles.usernameSize,
                  )}
                  style={{
                    color: localTheme?.fontColor || BLACK,
                  }}
                >
                  {user.username}
                </h1>
                {user.country && initialLinkGroup?.displayCountry && (
                  <span className="ml-2">
                    {
                      COUNTRIES.find((country) => country.code === user.country)
                        ?.emoji
                    }
                  </span>
                )}
              </span>
              <p
                className="mt-2 max-w-sm"
                style={{
                  color: localTheme?.secondaryColorFont || WHITE,
                }}
              >
                {initialLinkGroup?.description}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <TabSelector
            links={localLinks}
            theme={localTheme!}
            isPreview={isPreview}
            shadowStyle={generateShadowStyle(localTheme!)}
          />

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-4">
            {SOCIAL_PLATFORMS.filter(
              (platform) => user[platform.value as keyof typeof user],
            ).map((platform, index) => (
              <a
                key={index}
                href={
                  platform.prefix + user[platform.value as keyof typeof user] ||
                  ""
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                <platform.icon
                  style={{
                    color: localTheme?.iconColor || WHITE,
                    fill: localTheme?.iconColor || WHITE,
                  }}
                  size={
                    isMobilePreview ? previewStyles.iconSize : styles.iconSize
                  }
                  onClick={() => handleIconClick(platform.type)}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
