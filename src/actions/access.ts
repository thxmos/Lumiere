"use server";

import { hasPermission } from "@/utils/access";
import { getUser } from "./session.actions";
import type { User, Permissions } from "@/types/access";

/*
BIG TODO: This is slop code, dont make a mock resource, just make access utils use a dto based on Prisma
TODO: get list of resources from Prisma
TODO: differentiate between get vs getOwn, or create vs createOwn 
*/

// Type guard to check if a string is a valid resource
function isValidResource(resource: string): resource is keyof Permissions {
  return resource in (Object.keys(Permissions) as Array<keyof Permissions>);
}

export const hasPermissionAction = async (
  resourceString: string,
  action: string,
  data?: any,
): Promise<boolean> => {
  const { user } = await getUser();
  if (!user)
    throw new Error("You do not have permissions to access this resource");

  // Check if the resourceString is a valid resource
  if (!isValidResource(resourceString)) {
    throw new Error(`Invalid resource: ${resourceString}`);
  }

  const resource = resourceString as keyof Permissions;

  const mockUserForNow = {
    roles: [user.roles],
    id: user.id,
    blockedBy: [],
  } as User;

  return hasPermission(mockUserForNow, resource, action as any, data);
};
