import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { NavGroup } from "./types";

export interface NavMainProps {
  items: NavGroup[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground">
        Modules
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: NavGroup) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger
                asChild
                className={cn(
                  "flex w-full items-center bg-background text-foreground font-medium",
                  "hover:bg-accent/50 hover:text-foreground",
                  "active:bg-accent/70 active:text-foreground",
                  "group-data-[state=open]/collapsible:bg-accent/50 group-data-[state=open]/collapsible:text-foreground",
                  pathname.includes(item.url) && "bg-accent text-foreground",
                )}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "bg-transparent text-inherit font-medium p-6 pl-2 pr-2",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2",
                  )}
                >
                  <span
                    className={cn(
                      "text-primary border-2 border-border rounded-full p-1",
                      "group-data-[collapsible=icon]:mr-0",
                    )}
                  >
                    {item.icon}
                  </span>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium text-inherit">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            "bg-background text-foreground",
                            "hover:bg-accent/50 hover:text-foreground",
                            "active:bg-accent/70 active:text-foreground",
                            pathname.includes(subItem.url) &&
                              "bg-accent text-foreground",
                          )}
                        >
                          <Link href={`/dashboard/${item.url}/${subItem.url}`}>
                            {subItem.icon && (
                              <span className="text-primary mr-2">
                                {subItem.icon}
                              </span>
                            )}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
