import { Skeleton } from "@/modules/shared/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/modules/shared/components/ui/sidebar";

export function SidebarSkeleton() {
  return (
    <Sidebar className="bg-background border-r border-border">
      <SidebarHeader className="bg-background border-b border-border">
        {/* App Logo Area */}
        <div className="flex items-center p-2">
          <div className={"flex items-center w-full"}>
            <Skeleton className="h-10 w-10 text-primary" />
            <div className="ml-2 flex items-center space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
        {/* Account Switcher */}
        <div className="p-2">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background">
        {/* Account Section */}
        <SidebarGroup>
          <div className="p-2">
            <Skeleton className="h-4 w-24 mb-2" />
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </SidebarGroup>

        {/* Modules Section */}
        <SidebarGroup>
          <div className="p-2">
            <Skeleton className="h-4 w-16 mb-2" />
            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-[68px] w-full" />
                  <div className="pl-[34px] space-y-1">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-7 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-background border-t border-border">
        <div className="p-2">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
