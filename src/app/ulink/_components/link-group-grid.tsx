"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LinkGroupResponse } from "@/repositories/linkGroups";

interface LinkGroupGridProps {
  linkGroups: LinkGroupResponse[];
}

const LinkGroupGrid: React.FC<LinkGroupGridProps> = ({ linkGroups }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {linkGroups.map((group, index) => (
          <Link href={`/ulink/links/${group.id}`} key={group.id}>
            <Card className="h-full cursor-pointer">
              <CardHeader>
                <CardTitle className="select-none">{group.name}</CardTitle>
              </CardHeader>
              <CardContent className="select-none">
                <p>{group.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LinkGroupGrid;
