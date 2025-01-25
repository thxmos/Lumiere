import { create } from "zustand";

import { LinkDto } from "@/data-access/links";

type LinkStore = {
  links: LinkDto[];
  setLinks: (links: LinkDto[]) => void;
};

export const useLinksStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
}));
