"use client";

import { useState } from "react";
import { logout } from "@/actions/security/auth/logout";
import Link from "next/link";
import {
  DropdownMenu as DropdownWrapper,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { getInitials } from "@/utils/utils";

interface Props {
  user: any;
}

export default function DropdownMenu({ user }: Props) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const closeDropdown = () => setOpen(false);

  const handleLogout = async () => {
    closeDropdown();
    await logout();
  };

  return (
    <DropdownWrapper open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-1 border border-primary shadow-md"
        role="menu"
        aria-label="User account options"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="flex flex-col">
            {user.username}
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </span>
          <User className="text-sm" />
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary" />
        <DropdownMenuGroup>
          {[
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: LayoutDashboard,
            },
            {
              href: "#",
              label: "Sign Out",
              icon: LogOut,
              onClick: handleLogout,
            },
          ].map((item, index) => (
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
    </DropdownWrapper>
  );
}
