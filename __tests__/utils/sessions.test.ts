import { ValidateSessionOrThrow } from "@/utils/sessions";
import { isValidSession } from "@/actions/session";
import { jest } from "@jest/globals";

// Mock the isValidSession function
jest.mock("@/actions/session", () => ({
  isValidSession: jest.fn(),
}));

describe("ValidateSessionOrThrow", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not throw an error when the session is valid", async () => {
    // Mock isValidSession to return true
    (isValidSession as jest.Mock).mockResolvedValue(true);

    // The function should execute without throwing an error
    await expect(ValidateSessionOrThrow()).resolves.not.toThrow();

    // Verify that isValidSession was called
    expect(isValidSession).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when the session is invalid", async () => {
    // Mock isValidSession to return false
    (isValidSession as jest.Mock).mockResolvedValue(false);

    // The function should throw an error
    await expect(ValidateSessionOrThrow()).rejects.toThrow(
      "Your session has expired. Please log in again.",
    );

    // Verify that isValidSession was called
    expect(isValidSession).toHaveBeenCalledTimes(1);
  });

  it("should propagate errors from isValidSession", async () => {
    // Mock isValidSession to throw an error
    const error = new Error("Network error");
    (isValidSession as jest.Mock).mockRejectedValue(error);

    // The function should throw the same error
    await expect(ValidateSessionOrThrow()).rejects.toThrow("Network error");

    // Verify that isValidSession was called
    expect(isValidSession).toHaveBeenCalledTimes(1);
  });
});
