import { ImageDtoWithId } from "@/types/image";
import { create } from "zustand";

type AssetStore = {
  assets: ImageDtoWithId[];
  setAssets: (assets: ImageDtoWithId[]) => void;
};

export const useAssetStore = create<AssetStore>()((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
}));
