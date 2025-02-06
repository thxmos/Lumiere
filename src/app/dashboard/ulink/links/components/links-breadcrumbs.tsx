"use client";

import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { getLinkGroupNameFromId } from "@/actions/entities/link/getLinkGroupNameFromId";

import React from "react";

const LinksBreadcrumbs = () => {
  const pathname = usePathname();

  const [linkGroupName, setLinkGroupName] = useState<string | null>(null);

  useEffect(() => {
    const getLinkGroupName = async () => {
      const linkGroupId = pathname.split("/").pop();
      if (linkGroupId === "links" || !linkGroupId) return null;

      const name = await getLinkGroupNameFromId(linkGroupId);
      setLinkGroupName(name ?? null);
    };

    getLinkGroupName();
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/ulink/links">ULink</BreadcrumbLink>
        </BreadcrumbItem>
        {linkGroupName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{linkGroupName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default LinksBreadcrumbs;
