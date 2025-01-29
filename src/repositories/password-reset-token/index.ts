import { PasswordResetTokenRepository } from "./password-reset-token.repository";

export const passwordResetTokenRepository = new PasswordResetTokenRepository();

export * from "./types";
export * from "../errors";
