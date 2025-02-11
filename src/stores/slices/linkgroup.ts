import { StateCreator } from "zustand";
import { LinkGroupSlice, RootState } from "../types";
import { DEFAULT_THEME } from "@/constants/ui/theme";

export const createLinkGroupSlice: StateCreator<
  RootState,
  [],
  [],
  LinkGroupSlice
> = (set) => ({
  linkGroups: [],
  activeLinkGroup: null,

  // Group operations
  setLinkGroups: (linkGroups) => set({ linkGroups }),

  addLinkGroup: (linkGroup) =>
    set((state) => ({
      linkGroups: [
        ...state.linkGroups,
        {
          ...linkGroup,
          Links: [],
          theme: DEFAULT_THEME,
        },
      ],
    })),

  updateLinkGroup: (id, updates) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === id ? { ...group, ...updates } : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === id
          ? { ...state.activeLinkGroup, ...updates }
          : state.activeLinkGroup,
    })),

  removeLinkGroup: (id) =>
    set((state) => ({
      linkGroups: state.linkGroups.filter((group) => group.id !== id),
      activeLinkGroup:
        state.activeLinkGroup?.id === id ? null : state.activeLinkGroup,
    })),

  setActiveLinkGroup: (groupId) =>
    set((state) => ({
      activeLinkGroup:
        state.linkGroups.find((group) => group.id === groupId) || null,
      linkGroups: state.linkGroups.map((group) => ({
        ...group,
        active: group.id === groupId,
      })),
    })),

  // Link operations
  addLink: (groupId, link) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? { ...group, links: [...group.links, link] }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              links: [...state.activeLinkGroup.links, link],
            }
          : state.activeLinkGroup,
    })),

  updateLink: (groupId, linkId, updates) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              links: group.links.map((link) =>
                link.id === linkId ? { ...link, ...updates } : link,
              ),
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              links: state.activeLinkGroup.links.map((link) =>
                link.id === linkId ? { ...link, ...updates } : link,
              ),
            }
          : state.activeLinkGroup,
    })),

  removeLink: (groupId, linkId) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              links: group.links.filter((link) => link.id !== linkId),
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              links: state.activeLinkGroup.links.filter(
                (link) => link.id !== linkId,
              ),
            }
          : state.activeLinkGroup,
    })),

  updateLinks: (groupId, links) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId ? { ...group, links } : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? { ...state.activeLinkGroup, links }
          : state.activeLinkGroup,
    })),

  // Theme operations
  updateTheme: (groupId, updates) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              theme: { ...group.theme, ...updates },
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              theme: { ...state.activeLinkGroup.theme, ...updates },
            }
          : state.activeLinkGroup,
    })),

  // Social media operations
  updateSocialMedia: (groupId, platform, isActive) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              [`${platform}Active`]: isActive,
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              [`${platform}Active`]: isActive,
            }
          : state.activeLinkGroup,
    })),
});
