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
          Theme: DEFAULT_THEME,
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
          ? { ...group, Links: [...group.Links, link] }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              Links: [...state.activeLinkGroup.Links, link],
            }
          : state.activeLinkGroup,
    })),

  updateLink: (groupId, linkId, updates) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              Links: group.Links.map((link) =>
                link.id === linkId ? { ...link, ...updates } : link,
              ),
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              Links: state.activeLinkGroup.Links.map((link) =>
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
              Links: group.Links.filter((link) => link.id !== linkId),
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              Links: state.activeLinkGroup.Links.filter(
                (link) => link.id !== linkId,
              ),
            }
          : state.activeLinkGroup,
    })),

  updateLinks: (groupId, links) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId ? { ...group, Links: links } : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? { ...state.activeLinkGroup, Links: links }
          : state.activeLinkGroup,
    })),

  updateTheme: (groupId, updates) =>
    set((state) => ({
      linkGroups: state.linkGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              Theme: group.Theme
                ? { ...group.Theme, ...updates }
                : { ...DEFAULT_THEME, linkGroupId: groupId, ...updates },
            }
          : group,
      ),
      activeLinkGroup:
        state.activeLinkGroup?.id === groupId
          ? {
              ...state.activeLinkGroup,
              Theme: state.activeLinkGroup.Theme
                ? { ...state.activeLinkGroup.Theme, ...updates }
                : { ...DEFAULT_THEME, linkGroupId: groupId, ...updates },
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
