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

interface Project {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface NavAccountProps {
  projects: Project[];
}

export default function NavAccount({ projects }: NavAccountProps) {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground">
        Your Account
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              className={cn(
                "flex w-full items-center bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-medium",
                pathname.includes(item.url) &&
                  "bg-accent text-accent-foreground",
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
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuContent
                className="w-48 rounded-lg bg-popover text-popover-foreground"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <Folder className="size-4 mr-2 text-primary" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <Forward className="size-4 mr-2 text-primary" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <Trash2 className="size-4 mr-2 text-primary" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
