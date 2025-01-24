type Link = {
  id: string;
  url: string;
  userId: string;
  createdAt: Date;
};

type QrCode = {
  id: string;
  url: string;
  userId: string;
  createdAt: Date;
};

type Product = {
  id: string;
  name: string;
  price: number;
  userId: string;
  createdAt: Date;
};

type Role = "admin" | "user";
export type User = { blockedBy: string[]; roles: Role[]; id: string };

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

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
    action: "view" | "create" | "update";
  };
  qrCode: {
    dataType: QrCode;
    action: "view" | "create" | "update" | "delete";
  };
  products: {
    dataType: Product;
    action: "view" | "create" | "update" | "delete";
  };
};

export const ROLES = {
  admin: {
    link: {
      view: true,
      create: true,
      update: true,
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
  },
  user: {
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
      view: (user, product) => !user.blockedBy.includes(product.userId),
      create: true,
      update: (user, product) => product.userId === user.id,
    },
  },
} as const satisfies RolesWithPermissions;
