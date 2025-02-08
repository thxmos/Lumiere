import { Folder, Forward, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { NavItem } from "./types";

interface NavAccountProps {
  account: NavItem[];
}

export default function NavAccount({ account }: NavAccountProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground">
        Your Account
      </SidebarGroupLabel>
      <SidebarMenu>
        {account.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={cn(
                "flex w-full items-center bg-background text-foreground font-medium",
                "hover:bg-accent/50 hover:text-foreground",
                "active:bg-accent/70 active:text-foreground",
                pathname.includes(item.url) && "bg-accent text-foreground",
                "group-data-[collapsible=icon]:justify-center",
              )}
            >
              <Link
                href={`/dashboard/${item.url}`}
                className="flex items-center w-full py-2 px-2"
              >
                <span className="mr-2 text-primary group-data-[collapsible=icon]:mr-0">
                  {item.icon}
                </span>
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
