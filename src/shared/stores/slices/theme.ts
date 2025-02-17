import { StateCreator } from "zustand";
import { RootState, ThemeSlice } from "../types";
import { DEFAULT_THEME } from "@/modules/uLink/default-theme";

export const createThemeSlice: StateCreator<RootState, [], [], ThemeSlice> = (
  set,
) => ({
  theme: DEFAULT_THEME,
  setTheme: (theme) => set({ theme }),
  resetTheme: () => set({ theme: DEFAULT_THEME }),
});
