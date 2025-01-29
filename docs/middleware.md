# Middleware

## Design

- **Modular Structure**: Each middleware is in its own file, making it easier to maintain and test.
- **Composable System**: The composeMiddleware function allows you to chain multiple middleware functions together in a clean way.
- **Type Safety**: Full TypeScript support with proper types for middleware functions.
- **Easy to Extend**: Adding new middleware is as simple as creating a new file and adding it to the composition chain.

## Structure:

```
src/
  middleware/
    core/
      types.ts      - Shared types for the middleware system
      compose.ts    - Middleware composition utility
    rate-limit.ts   - Rate limiting middleware
    auth.ts         - Authentication middleware
    static.ts       - Static file handling middleware
  middleware.ts     - Main middleware entry point
```

## Usage:

- Each middleware is created using a factory pattern that takes the next middleware handler as a parameter.
- Middlewares can be composed in any order in the main middleware.ts file.
- Each middleware can handle its specific concerns independently.
- Error handling and response generation is encapsulated within each middleware.

## Add new middleware

- Create a new file in the middleware directory
- Define your middleware using the MiddlewareFactory type
- Add it to the composition chain in middleware.ts
