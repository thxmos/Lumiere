"use client";

import Image from "next/image";
import { useTransition } from "react";
import { PLACEHOLDER_IMG } from "@/config/theme/images";
import type { LinkDtoWithId } from "@/modules/shared/types/links";
import type { ThemeNoId } from "@/modules/shared/types/entities/theme";
import { updateLinkClicked } from "@/actions/entities/link/updateLinkClicked";
import type { BrowserData } from "@/modules/shared/types/clicks";

export function LinkCard({
  id,
  title,
  url,
  imageUrl,
  theme,
  isPreview = false,
  shadowStyle,
}: LinkDtoWithId & {
  theme: ThemeNoId;
  isPreview: boolean;
  shadowStyle: React.CSSProperties;
}) {
  const [isPending, startTransition] = useTransition();

  const cardStyle = {
    backgroundColor: theme.cardBackgroundColor || "#ffffff",
    borderColor: theme.borderColor || "#000000",
    borderWidth: theme.borderWidth ? `${theme.borderWidth}px` : "1px",
    borderStyle: theme.borderStyle || "solid",
    borderRadius: theme.borderRadius ? `${theme.borderRadius}px` : "4px",
    fontFamily: theme.fontFamily,
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out", // Add transition for smooth animation
    ...shadowStyle,
  };

  const titleStyle = {
    color: theme.fontColor,
    fontWeight: theme.fontWeight,
  };

  const handleClick = () => {
    startTransition(async () => {
      if (!isPreview) {
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
        await updateLinkClicked(id, browserData as Partial<BrowserData>);
      }
      window.open(url, "_blank");
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center p-2 w-full text-left transition-all hover:opacity-80 hover:scale-105 active:scale-95 ${
        isPending ? "opacity-50" : ""
      }`}
      style={cardStyle}
      disabled={isPending}
    >
      <Image
        src={imageUrl || PLACEHOLDER_IMG}
        alt={title}
        width={50}
        height={50}
        className="rounded-md"
        style={{
          borderColor: theme.borderColor,
          borderWidth: `${theme.borderWidth}px`,
          borderStyle: theme.borderStyle,
          borderRadius: `${theme.borderRadius}px`,
        }}
      />
      <span
        className="ml-4 text-lg"
        style={{
          color: theme.cardTextColor || "#000000",
        }}
      >
        {title}
      </span>
    </button>
  );
}
