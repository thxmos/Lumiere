import { MiddlewareFactory, MiddlewareHandler } from "./types";

// Compose middleware
export function composeMiddleware(middlewareFactories: MiddlewareFactory[]) {
  return (finalHandler: MiddlewareHandler): MiddlewareHandler => {
    return middlewareFactories.reduceRight((previous, current) => {
      return current(previous);
    }, finalHandler);
  };
}
