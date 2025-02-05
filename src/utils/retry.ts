/**
 * Retry a function a specified number of times with optional backoff.
 * @param fn - The function to retry.
 * @param options - The retry options.
 * @returns The result of the function.
 * @throws The last error if all retries fail.
 */

async function retry<T>(
  fn: () => Promise<T>,
  options: { retries: number; backoff: boolean },
): Promise<T> {
  let lastError: Error;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (options.backoff) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000),
        );
      }
    }
  }
  throw lastError!;
}

export default retry;
