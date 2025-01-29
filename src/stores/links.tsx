import { create } from "zustand";

import { LinkDto } from "@/actions/entities/links";

type LinkStore = {
  links: LinkDto[];
  setLinks: (links: LinkDto[]) => void;
};

export const useLinksStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
}));
