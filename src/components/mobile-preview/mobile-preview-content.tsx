"use client";

import { useLinksStore } from "@/stores/links";
import { useThemeStore } from "@/stores/themes";

interface Props {}

const MobilePreviewContent: React.FC<Props> = ({}) => {
  const { links } = useLinksStore();
  const { theme } = useThemeStore();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start text-black"
      style={{
        fontFamily: theme?.fontFamily || "system-ui, sans-serif",
        backgroundColor: theme?.backgroundColor || "#ffffff",
      }}
    >
      {links.map((link) => (
        <>{link.active && <p>{link.title}</p>}</>
      ))}
    </div>
  );
};

export default MobilePreviewContent;
