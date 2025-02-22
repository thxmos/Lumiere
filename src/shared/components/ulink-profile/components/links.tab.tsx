import { LinkCard } from "./link-card";
import { LinkDtoWithId } from "@s-types/links";
import { ThemeNoId } from "@s-types/entities/theme";

export function LinksTab({
  links,
  theme,
  isPreview,
  shadowStyle,
}: {
  links: LinkDtoWithId[];
  theme: ThemeNoId;
  isPreview: boolean;
  shadowStyle: React.CSSProperties;
}) {
  return (
    <div className="space-y-4 flex flex-col">
      {links
        .filter((link) => link.active)
        .map((link, index) => {
          return (
            <LinkCard
              key={index}
              {...link}
              theme={theme}
              isPreview={isPreview}
              shadowStyle={shadowStyle}
            />
          );
        })}
    </div>
  );
}
