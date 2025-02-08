import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Account } from "./types";
import NewAccountModal from "./new-account-modal";
import { cn } from "@/utils/utils";

export interface AccountSwitcherProps {
  accounts: Account[];
  onAddAccount?: (name: string) => void;
}

export function AccountSwitcher({
  accounts,
  onAddAccount,
}: AccountSwitcherProps) {
  const { isMobile, state } = useSidebar();
  const [activeAccount, setActiveAccount] = useState<Account>(accounts[0]);
  const isCollapsed = state === "collapsed";

  const handleCreateAccount = (name: string) => {
    onAddAccount?.(name);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                "group-data-[collapsible=icon]:justify-center",
              )}
            >
              <div
                className={cn(
                  "flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                  isCollapsed ? "mr-0" : "mr-2",
                )}
              >
                {activeAccount.logo}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-foreground">
                  {activeAccount.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activeAccount.plan}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-popover text-popover-foreground"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Your Accounts{" "}
              <span className="text-xs text-muted-foreground">
                {`(${accounts.length}/3)`}
              </span>
            </DropdownMenuLabel>
            {accounts.map((account, index) => (
              <DropdownMenuItem
                key={account.name}
                onClick={() => setActiveAccount(account)}
                className="gap-2 p-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-border bg-background">
                  {account.logo}
                </div>
                {account.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-border" />
            <NewAccountModal onCreateAccount={handleCreateAccount} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
