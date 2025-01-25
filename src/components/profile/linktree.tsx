"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import placeholder from "@/assets/product-default.svg";
import { LinkDto } from "@/data-access/links";
import { ThemeNoId } from "@/data-access/theme";
import { useThemeStore } from "@/stores/themes";
import { useLinksStore } from "@/stores/links";
import BackgroundVideo from "@/app/[username]/components/background-video";
import { UserDto } from "@/data-access/user";
import { BLACK, WHITE } from "@/constants/colors";
import { COUNTRIES } from "@/constants/countries";
import { TabSelector } from "@/app/[username]/components/tab-selector";
import { SOCIAL_PLATFORMS } from "@/constants/social-media";
import { usePathname } from "next/navigation";
import { Tab } from "@/app/dashboard/tabs";

interface Props {
  isPreview?: boolean;
  initialLinks: LinkDto[];
  initialTheme: ThemeNoId;
  user: UserDto;
  tab: Tab;
}

const LinkTree: React.FC<Props> = ({
  isPreview = false,
  initialTheme,
  initialLinks,
  user,
}) => {
  const pathname = usePathname();

  const [localTheme, setlocalTheme] = useState<ThemeNoId | null>(initialTheme);
  const [localLinks, setLocalLinks] = useState<LinkDto[]>(initialLinks);

  const { theme, setTheme } = useThemeStore();
  const { links, setLinks } = useLinksStore();

  useEffect(() => {
    setTheme(initialTheme);
    setLinks(initialLinks);
  }, []);

  useEffect(() => {
    if (!isPreview) return;

    if (theme) setlocalTheme(theme);
    if (links) setLocalLinks(links);
  }, [theme, links]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: localTheme?.fontFamily || "system-ui, sans-serif",
      }}
    >
      {localTheme?.backgroundType === "color" && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: localTheme?.backgroundColor || "#000000" }}
        ></div>
      )}

      {localTheme?.backgroundType === "image" && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${localTheme?.backgroundImageUrl})` }}
        ></div>
      )}

      {localTheme?.backgroundType === "video" && localTheme?.videoUrl && (
        <BackgroundVideo bgVideo={localTheme?.videoUrl} />
      )}

      <div className="relative z-10 min-h-screen  px-4 py-16 flex flex-col">
        <div className="max-w-md mx-auto flex-grow">
          {/* Profile Info */}
          <div className="flex items-center mb-6 justify-center">
            <Image
              src={user.avatar || placeholder}
              alt="Profile Picture"
              width={100}
              height={100}
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
                  className="text-3xl font-bold"
                  style={{
                    color: localTheme?.fontColor || BLACK,
                  }}
                >
                  {user.username}
                </h1>
                {user.country && (
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
                {user.description}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <TabSelector links={localLinks} theme={localTheme!} />

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
                  size={24}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;
