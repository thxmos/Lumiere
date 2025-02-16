import { StateCreator } from "zustand";
import { AssetSlice, RootState } from "../types";

export const createAssetSlice: StateCreator<RootState, [], [], AssetSlice> = (
  set,
) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset],
    })),
  removeAsset: (assetId) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== assetId),
    })),
});
