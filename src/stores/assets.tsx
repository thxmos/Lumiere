import { Image } from "@prisma/client";
import { create } from "zustand";

type AssetStore = {
  assets: Image[];
  setAssets: (assets: Image[]) => void;
};

export const useAssetStore = create<AssetStore>()((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
}));
