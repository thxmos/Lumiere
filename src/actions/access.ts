"use server";

import { hasPermission } from "@/utils/access";
import { getUser } from "./session";
import type { User, Permissions } from "@/types/access";
import { getUserById } from "@/data-access/user";

/*
BIG TODO: This is slop code, dont make a mock resource, just make access utils use a dto based on Prisma
TODO: get list of resources from Prisma
TODO: differentiate between get vs getOwn, or create vs createOwn 
*/

// Type guard to check if a string is a valid resource
function isValidResource(resource: string): resource is keyof Permissions {
  return resource in (Object.keys(Permissions) as Array<keyof Permissions>);
}

// TODO: securely get
export const hasPermissionAction = async (
  resource: string,
  action: string,
  data?: any,
): Promise<boolean> => {
  // Check if the resourceString is a valid resource
  if (!isValidResource(resource)) {
    throw new Error(`Invalid resource: ${resource}`);
  }

  const { user } = await getUser();
  if (!user)
    throw new Error("You do not have permissions to access this resource");

  // Here because i eventually want to take roles out of session
  const userFromDb = await getUserById(user.id);
  if (!userFromDb)
    throw new Error("You do not have permissions to access this resource");

  const userRoles = [userFromDb.roles];

  const resourceKey = resource as keyof Permissions;

  const mockUserForNow = {
    roles: userRoles,
    id: user.id,
    blockedBy: [],
  } as User;

  return hasPermission(mockUserForNow, resourceKey, action as any, data);
};
