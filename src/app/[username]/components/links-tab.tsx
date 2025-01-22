import { LinkCard } from "./link-card";
import { LinkDto } from "@/data-access/links";
import { CreateThemeDto } from "@/data-access/theme";

export function LinksTab({
  links,
  theme,
}: {
  links: LinkDto[];
  theme: CreateThemeDto;
}) {
  return (
    <div className="space-y-4 flex flex-col">
      {links.map((link, index) => (
        <LinkCard key={index} {...link} theme={theme} />
      ))}
    </div>
  );
}
