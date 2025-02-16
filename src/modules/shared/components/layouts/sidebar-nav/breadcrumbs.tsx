"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/modules/shared/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

function generateBreadcrumb(path: string) {
  const segments = path
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);

  return segments.map((segment) => ({
    href: `/${segments.slice(0, segments.indexOf(segment) + 1).join("/")}`,
    label: segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  }));
}

const nonClickable = ["dashboard", "settings", "account"];

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumb(pathname).filter(
    (crumb) => crumb.href !== "/dashboard",
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {index === breadcrumbs.length - 1 || index === 0 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
