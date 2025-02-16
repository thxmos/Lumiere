import { AssetRepository } from "./asset.repository";

// Create a singleton instance
export const assetRepository = new AssetRepository();

// Export types
export * from "./types";
export * from "../errors";
