import { create } from "zustand";
import { LinkResponse } from "@/repositories/link";

type LinkStore = {
  links: LinkResponse[];
  setLinks: (links: LinkResponse[]) => void;
};

export const useLinksStore = create<LinkStore>((set) => ({
  links: [],
  setLinks: (links) => set({ links }),
}));
