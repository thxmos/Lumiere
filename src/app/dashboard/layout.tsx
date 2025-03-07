import { AppSidebar } from "@/shared/components/layouts/nav-sidebar/app-sidebar";
import { Breadcrumbs } from "@/shared/components/layouts/nav-sidebar/breadcrumbs";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { SunIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <Button variant="outline" size="icon" className="mr-4">
            <SunIcon className="w-4 h-4" />
          </Button>
        </header>
        <div className="flex flex-col gap-4 p-4 overflow-y-scroll">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
