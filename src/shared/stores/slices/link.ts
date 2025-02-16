import { StateCreator } from "zustand";
import { LinkSlice, RootState } from "../types";

export const createLinkSlice: StateCreator<RootState, [], [], LinkSlice> = (
  set,
) => ({
  links: [],
  setLinks: (links) => set({ links }),
  addLink: (link) =>
    set((state) => ({
      links: [...state.links, link],
    })),
  updateLink: (id, updatedLink) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updatedLink } : link,
      ),
    })),
  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
});
