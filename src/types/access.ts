import { Link, Product, QRCode, Role, Theme } from "@prisma/client";

/*
TODO: Get entities dynamically from Prisma
TODO: Clean up the blockedBy logic
TODO: Cleanup User type
*/

export type User = { blockedBy: string[]; roles: Role[]; id: string };

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

/*
RolesWithPermissions

1. [R in Role] - Maps over each role (admin/user) as a key

2. For each role, creates an object that can have some or all permission categories
   (Partial<{[Key in keyof Permissions]}>) e.g. link, qrCode, products, theme

3. For each permission category, creates an object that can have some or all actions
   (Partial<{[Action in Permissions[Key]["action"]]}>)
   e.g. view, create, update, delete

4. Each action maps to a PermissionCheck<Key> which can be either:
   - A boolean (true/false)
   - A function that takes a user and data and returns boolean
*/
export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

export type Permissions = {
  // Can do something like Pick<Todo, "userId"> to get just the rows you use
  link: {
    dataType: Link;
    action: "view" | "create" | "update" | "delete";
  };
  qrCode: {
    dataType: QRCode;
    action: "view" | "create" | "update" | "delete";
  };
  products: {
    dataType: Product;
    action: "view" | "create" | "update" | "delete";
  };
  theme: {
    dataType: Theme;
    action: "view" | "create" | "update" | "delete";
  };
};

export const ROLES = {
  ADMIN: {
    link: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    qrCode: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    products: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    theme: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  USER: {
    link: {
      view: (user, link) => !user.blockedBy.includes(link.userId),
      create: true,
      update: (user, link) => link.userId === user.id,
    },
    qrCode: {
      view: (user, qrCode) => !user.blockedBy.includes(qrCode.userId),
      create: true,
      update: (user, qrCode) => qrCode.userId === user.id,
    },
    products: {
      view: (user, product) => !user.blockedBy.includes(product.id),
      create: true,
      update: (user, product) => product.id === user.id,
    },
    theme: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
} as const satisfies RolesWithPermissions;
