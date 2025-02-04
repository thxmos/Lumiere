import { USER_ROLES } from "./user-roles";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  role?: USER_ROLES;
  onClick?: () => void;
};
