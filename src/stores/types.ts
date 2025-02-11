import { LinkResponse } from "@/repositories/link";
import { SessionUser } from "@/utils/lib/lucia";
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

export interface LinkSlice {
  links: LinkResponse[];
  setLinks: (links: LinkResponse[]) => void;
  addLink: (link: LinkResponse) => void;
  updateLink: (id: string, link: Partial<LinkResponse>) => void;
  removeLink: (id: string) => void;
}

// Combine all slices into a RootState
export interface RootState
  extends UserSlice,
    ThemeSlice,
    AssetSlice,
    LinkSlice {}
