import { LinkGroupRepository } from "./linkGroup.repository";

// Create a singleton instance
export const linkGroupRepository = new LinkGroupRepository();

// Export types
export * from "./types";
export * from "../errors";
