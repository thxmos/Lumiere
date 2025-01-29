import { ClickRepository } from "./click.repository";

// Create a singleton instance
export const clickRepository = new ClickRepository();

// Export types
export * from "./types";
export * from "../errors";
