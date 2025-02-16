import { create } from "zustand";

import type { ThemeNoId } from "@/shared/types/entities/theme";

type ThemeStore = {
  theme: ThemeNoId | null;
  setTheme: (theme: ThemeNoId) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: null,
  setTheme: (theme) => set({ theme }),
}));
