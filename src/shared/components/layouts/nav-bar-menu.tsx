"use client";

import { useState } from "react";
import { logout } from "@/shared/actions/security/auth/logout";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  BarcodeIcon,
  Cable,
  LogOut,
  MailPlusIcon,
  ScanEyeIcon,
  ScrollTextIcon,
  User,
  UserIcon,
} from "lucide-react";
import { getInitials } from "@/shared/utils/utils";
import { USER_ROLES } from "@/shared/types/user-roles";
import { NavItem } from "@/shared/types/navigation";

export default function DropdownMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const closeDropdown = () => setOpen(false);

  const handleLogout = async () => {
    closeDropdown();
    await logout();
  };

  const navItems: NavItem[] = [
    {
      href: "/ulink",
      label: "ULink",
      icon: Cable,
      role: USER_ROLES.USER,
    },
    {
      href: "/epk",
      label: "EPK",
      icon: ScrollTextIcon,
      role: USER_ROLES.ADMIN,
    },
    {
      href: "/foresight",
      label: "Foresight",
      icon: ScanEyeIcon,
      role: USER_ROLES.USER,
    },
    {
      href: "/exchange",
      label: "Exchange",
      icon: BarcodeIcon,
      role: USER_ROLES.ADMIN,
    },

    {
      href: "/kaizen",
      label: "Kaizen",
      icon: MailPlusIcon,
      role: USER_ROLES.USER,
    },
    {
      href: "/user-settings",
      label: "User Settings",
      icon: UserIcon,
      role: USER_ROLES.USER,
    },
    {
      href: "#",
      label: "Sign Out",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  return (
    <Link href="/dashboard/ulink/links">
      {/* <DropdownWrapper> */}
      {/* <DropdownMenuTrigger asChild> */}
      <Avatar
        className="cursor-pointer border border-primary"
        role="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
      >
        <AvatarImage src={user.avatar} alt="" />
        <AvatarFallback className="bg-red-500 text-white text-xs">
          {getInitials(user.name!)}
        </AvatarFallback>
      </Avatar>
      {/* </DropdownMenuTrigger> */}
      {/* <DropdownMenuContent
          className="w-56 mt-1 border border-primary shadow-md"
          role="menu"
          aria-label="User account options"
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className="flex flex-col">
              {user.username}
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </span>
            <User className="text-sm" />
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary" /> */}
      {/* <DropdownMenuLabel>
          <span className="text-xs font-medium text-muted-foreground">
            Modules (less corny name)
          </span>
        </DropdownMenuLabel> */}
      {/* <DropdownMenuGroup>
            {navItems
              .filter((item) => item.role === user.roles)
              .map((item, index) => (
                <DropdownMenuItem asChild key={index}>
                  {
                    <Link
                      href={item.href}
                      className="flex items-center justify-between w-full cursor-pointer"
                      onClick={item.onClick ?? closeDropdown}
                      role="menuitem"
                    >
                      <span>{item.label}</span>
                      <item.icon className="text-sm" aria-hidden="true" />
                    </Link>
                  }
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownWrapper> */}
    </Link>
  );
}
