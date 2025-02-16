import { UserRepository } from "./user.repository";

// Create a singleton instance
export const userRepository = new UserRepository();

// Export types
export * from "./types";
export * from "../errors";
