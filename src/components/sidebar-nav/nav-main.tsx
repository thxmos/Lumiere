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
import { NavItem } from "./types";

export interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground">
        Modules
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: NavItem) => (
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
                  "flex w-full items-center bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-medium",
                  pathname.includes(item.url) &&
                    "bg-accent text-accent-foreground",
                )}
              >
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "bg-background text-foreground font-medium p-6 pl-2 pr-2",
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
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub className="[--sidebar-menu-sub-color:theme(colors.primary)]">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={cn(
                            "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
                            pathname.includes(subItem.url) &&
                              "bg-accent text-accent-foreground",
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
