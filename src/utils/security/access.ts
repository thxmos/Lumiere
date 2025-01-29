import type { Permissions, RolesWithPermissions, User } from "@/types/access";
import { ROLES } from "@/types/access";

/*
Rough ABAC implementation helper method
TODO:
- user's BlockedBy?
*/

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"],
) {
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
      action
    ];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}
