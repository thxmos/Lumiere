import { LinkResponse } from "@/shared/core/db/repositories/link";
import { LinkGroupWithLinksTheme } from "@/shared/core/db/repositories/linkGroup";
import { LinkGroupResponse } from "@/shared/core/db/repositories/linkGroup";
import { SessionUser } from "@/shared/core/auth/lucia";
import { Asset, Theme } from "@prisma/client";

export interface UserSlice {
  user: SessionUser;
  setUser: (user: SessionUser) => void;
  clearUser: () => void;
}

export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

export interface AssetSlice {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (assetId: string) => void;
}

export interface LinkGroupSlice {
  linkGroups: LinkGroupWithLinksTheme[];
  activeLinkGroup: LinkGroupWithLinksTheme | null;

  // Group operations
  setLinkGroups: (linkGroups: LinkGroupWithLinksTheme[]) => void;
  addLinkGroup: (linkGroup: LinkGroupResponse) => void;
  updateLinkGroup: (id: string, updates: Partial<LinkGroupResponse>) => void;
  removeLinkGroup: (id: string) => void;
  setActiveLinkGroup: (groupId: string) => void;

  // Link operations within groups
  addLink: (groupId: string, link: LinkResponse) => void;
  updateLink: (
    groupId: string,
    linkId: string,
    updates: Partial<LinkResponse>,
  ) => void;
  removeLink: (groupId: string, linkId: string) => void;
  updateLinks: (groupId: string, links: LinkResponse[]) => void;

  // Theme operations
  updateTheme: (groupId: string, updates: Partial<Theme>) => void;

  // Social media
  updateSocialMedia: (
    groupId: string,
    platform: string,
    isActive: boolean,
  ) => void;
}

// Combine all slices into a RootState
export interface RootState extends AssetSlice, LinkGroupSlice {}
