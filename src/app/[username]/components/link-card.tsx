import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/product-default.svg";
import { LinkDto } from "@/data-access/links";
import { CreateThemeDto } from "@/data-access/theme";

export function LinkCard({
  title,
  url,
  imageUrl,
  theme,
}: LinkDto & { theme: CreateThemeDto }) {
  const cardStyle = {
    backgroundColor: theme.cardBackgroundColor || "#ffffff",
    borderColor: theme.borderColor || "#000000",
    borderWidth: theme.borderWidth ? `${theme.borderWidth}px` : 1,
    borderStyle: theme.borderStyle || "solid",
    borderRadius: theme.borderRadius ? `${theme.borderRadius}px` : 4,
    fontFamily: theme.fontFamily,
  };

  const titleStyle = {
    color: theme.fontColor,
    fontWeight: theme.fontWeight,
  };

  return (
    <Link href={url} passHref>
      <div
        className="flex items-center p-2 transition-all hover:opacity-80 hover:scale-105"
        style={cardStyle}
      >
        <Image
          src={imageUrl || placeholder}
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
      </div>
    </Link>
  );
}
