import { create } from "zustand";
import { LinkGroupWithLinksTheme } from "@core/db/repositories/linkGroup";

type LinkGroupStore = {
  linkGroups: LinkGroupWithLinksTheme[];
  isLoading: boolean;
  error: string | null;
  setLinkGroups: (linkGroups: LinkGroupWithLinksTheme[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useLinkGroupsStore = create<LinkGroupStore>((set) => ({
  linkGroups: [],
  isLoading: false,
  error: null,
  setLinkGroups: (linkGroups) => set({ linkGroups }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
