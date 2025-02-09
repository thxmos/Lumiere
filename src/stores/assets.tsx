import { Asset } from "@prisma/client";
import { create } from "zustand";

type AssetStore = {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
};

export const useAssetStore = create<AssetStore>()((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
}));
