import { isValidSession } from "@/actions/session.actions";

export const ValidateSessionOrThrow = async () => {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }
};
