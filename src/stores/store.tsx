import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RootState } from "./types";
import { createUserSlice } from "./slices/user";
import { createThemeSlice } from "./slices/theme";
import { createAssetSlice } from "./slices/asset";
import { createLinkSlice } from "./slices/link";

export const useStore = create<RootState>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createThemeSlice(...args),
      ...createAssetSlice(...args),
      ...createLinkSlice(...args),
    }),
    {
      // Persistence configuration
      name: "root-store", // localStorage key
      partialize: (state) => ({
        // Only persist selected state
        user: state.user,
        theme: state.theme,
      }),
    },
  ),
);

export const useUser = () =>
  useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    clearUser: state.clearUser,
  }));

export const useTheme = () =>
  useStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    resetTheme: state.resetTheme,
  }));

export const useAssets = () =>
  useStore((state) => ({
    assets: state.assets,
    setAssets: state.setAssets,
    addAsset: state.addAsset,
    removeAsset: state.removeAsset,
  }));

export const useLinks = () =>
  useStore((state) => ({
    links: state.links,
    setLinks: state.setLinks,
    addLink: state.addLink,
    updateLink: state.updateLink,
    removeLink: state.removeLink,
  }));
