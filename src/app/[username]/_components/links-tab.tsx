import { LinkCard } from "./link-card";
import { LinkDto } from "@/data-access/links";

export function LinksTab({ links }: { links: LinkDto[] }) {
  return (
    <div className="space-y-4 flex flex-col">
      {links.map((link, index) => (
        <LinkCard key={index} {...link} />
      ))}
    </div>
  );
}
