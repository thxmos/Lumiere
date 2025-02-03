import { getLinkGroupsByUserId } from "@/actions/entities/link/getLinkGroupsByUserId";
import Link from "next/link";
import React from "react";
import LinkGroupForm from "./link-group-form";
import { Button } from "@/components/ui/button";

const LinkGroupsPage = async () => {
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <p>Link Groups</p>
      <div className="flex flex-wrap gap-2">
        {linkGroups.map((group) => (
          <Button variant="outline" key={group.id}>
            <Link href={`/ulink/links/${group.id}`} key={group.id}>
              {group.name}
            </Link>
          </Button>
        ))}
      </div>
      <LinkGroupForm />
    </div>
  );
};

export default LinkGroupsPage;
