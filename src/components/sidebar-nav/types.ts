export interface NavData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  userAccounts: UserAccount[];
  account: NavItem[];
  navMain: NavGroup[];
}

export interface UserAccount {
  title: string;
  logo: React.ReactNode;
  plan: string;
}

export interface NavGroup {
  title: string;
  description: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}
