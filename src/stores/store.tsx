import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RootState } from "./types";
import { createUserSlice } from "./slices/user";
import { createThemeSlice } from "./slices/theme";
import { createAssetSlice } from "./slices/asset";
import { createLinkGroupSlice } from "./slices/linkgroup";

export const useStore = create<RootState>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createThemeSlice(...args),
      ...createAssetSlice(...args),
      ...createLinkGroupSlice(...args),
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
