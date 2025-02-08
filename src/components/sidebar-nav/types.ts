// TODO: replace with prisma one
export interface Account {
  id: string;
  name: string;
  logo: React.ReactNode;
  plan: string;
}

export interface NavItem {
  title: string;
  description: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
    icon?: React.ReactNode;
  }>;
}
