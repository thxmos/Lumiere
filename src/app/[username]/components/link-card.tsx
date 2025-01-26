"use client";

import Image from "next/image";
import { useTransition } from "react";
import { PLACEHOLDER_IMG } from "@/constants/images";
import type { LinkDtoWithId } from "@/types/links";
import type { ThemeNoId } from "@/types/theme";
import { updateLinkClicked } from "../actions";

/*
  add mobile styling to make it a push button animation
*/

export function LinkCard({
  id,
  title,
  url,
  imageUrl,
  theme,
}: LinkDtoWithId & { theme: ThemeNoId }) {
  const [isPending, startTransition] = useTransition();

  const cardStyle = {
    backgroundColor: theme.cardBackgroundColor || "#ffffff",
    borderColor: theme.borderColor || "#000000",
    borderWidth: theme.borderWidth ? `${theme.borderWidth}px` : "1px",
    borderStyle: theme.borderStyle || "solid",
    borderRadius: theme.borderRadius ? `${theme.borderRadius}px` : "4px",
    fontFamily: theme.fontFamily,
    cursor: "pointer",
  };

  const titleStyle = {
    color: theme.fontColor,
    fontWeight: theme.fontWeight,
  };

  const handleClick = () => {
    startTransition(async () => {
      await updateLinkClicked(id);
      window.open(url, "_blank");
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center p-2 w-full text-left transition-all hover:opacity-80 hover:scale-105 ${isPending ? "opacity-50" : ""}`}
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
      <span className="ml-4 text-lg" style={titleStyle}>
        {title}
      </span>
    </button>
  );
}
