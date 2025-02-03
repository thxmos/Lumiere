/*
    SidebarTab is used in the sidebar component to define the tabs
*/

export type SidebarTab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  userRole?: string;
  mobilePreview?: boolean;
};
