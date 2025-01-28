import { isValidSession } from "@/actions/session";

export const ValidateSessionOrThrow = async () => {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }
};
