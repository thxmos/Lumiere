import { create } from "zustand";
import { LinkGroupWithLinksTheme } from "@core/db/repositories/linkGroup";

type LinkGroupStore = {
  linkGroups: LinkGroupWithLinksTheme[];
  setLinkGroups: (linkGroups: LinkGroupWithLinksTheme[]) => void;
};

export const useLinkGroupsStore = create<LinkGroupStore>((set) => ({
  linkGroups: [],
  setLinkGroups: (linkGroups) => set({ linkGroups }),
}));
