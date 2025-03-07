import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RootState } from "./types";
import { createAssetSlice } from "./slices/asset";
import { createLinkGroupSlice } from "./slices/linkgroup";

export const useStore = create<RootState>()(
  persist(
    (...args) => ({
      ...createAssetSlice(...args),
      ...createLinkGroupSlice(...args),
    }),
    {
      // Persistence configuration
      name: "root-store", // localStorage key
      partialize: (state) => ({
        // Only persist selected state
        // user: state.user,
        // theme: state.theme,
      }),
    },
  ),
);

//TODO
// - i remember the persistence configuration was good pretty sure but i forget why
// - delete user store and just use cookie
// - link group manage themes as well as links
