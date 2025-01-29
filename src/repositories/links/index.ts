import { LinkRepository } from "./link.repository";

// Create a singleton instance
export const linkRepository = new LinkRepository();

// Export types
export * from "./types";
export * from "../errors";
