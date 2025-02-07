export interface Team {
  name: string;
  logo: React.ReactNode;
  plan: string;
}

export interface TeamSwitcherProps {
  teams: Team[];
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

export interface NavMainProps {
  items: NavItem[];
}
