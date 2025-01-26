import { LinkCard } from "./link-card";
import { LinkDto } from "@/data-access/links";
import { ThemeNoId } from "@/data-access/theme";

export function LinksTab({
  links,
  theme,
}: {
  links: LinkDto[];
  theme: ThemeNoId;
}) {
  return (
    <div className="space-y-4 flex flex-col">
      {links.map((link, index) => {
        if (link.active) {
          return <LinkCard key={index} {...link} theme={theme} />;
        }
      })}
    </div>
  );
}
