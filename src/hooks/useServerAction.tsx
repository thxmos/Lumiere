import { useState } from "react";

/*
 * Custom hook to manage server action state with loading, error, and data handling.
 * T -> The expected return type of the server action
 * P -> The parameter type for the server action, defaults to void
 */

export function useServerAction<T, P = void>(
  serverAction: (params: P) => Promise<T>,
  onSuccess?: (data: T) => void,
  onError?: (error: Error) => void,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // Track returned data
  const [data, setData] = useState<T | null>(null);

  const execute = async (params: P) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await serverAction(params);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (e) {
      // Convert unknown errors to Error objects
      const error = e instanceof Error ? e : new Error("Unknown error");
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error, data };
}
