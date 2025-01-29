# Repository Pattern Implementation Guide

## Overview

The repository pattern is an abstraction layer between the application's business logic and data persistence layer. This implementation provides a type-safe, consistent approach to data access using TypeScript and Prisma.

## Core Components

### Base Repository Interface

The base repository interface defines the standard CRUD operations that all repositories should implement:
typescriptCopyexport interface IBaseRepository<T, CreateInput, UpdateInput> {
findById(id: string): Promise<T | null>;
create(data: CreateInput): Promise<T>;
update(id: string, data: UpdateInput): Promise<T>;
delete(id: string): Promise<void>;
}

### Entity-Specific Repository Interface

Each entity extends the base repository and adds its specialized methods:

```typescript
export interface IUserRepository
  extends IBaseRepository<UserResponse, UserCreateInput, UserUpdateInput> {
  findByEmail(email: string): Promise<UserResponse | null>;
}
```

### Repository Implementation

Concrete implementations handle the actual data access and error handling:

```typescript
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      return user ? this.removePrivateFields(user) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch user by id", error);
    }
  }
  // ... other methods
}
```

## Benefits

### 1. Separation of Concerns

- Isolates data access logic from business logic
- Makes the codebase more maintainable and testable
- Allows for easy swapping of data sources without affecting business logic

### 2. Type Safety

- Generic types ensure consistent data structures
- TypeScript compiler catches type-related errors at build time
- Autocompletion support in IDEs

### 3. Error Handling

- Centralized error handling for data access operations
- Custom error types for different scenarios:
  - `NotFoundError`
  - `DuplicateError`
  - `RepositoryError`

### 4. Standardization

- Consistent method signatures across repositories
- Predictable behavior for common operations
- Reduced code duplication

### 5. Data Transformation

- Centralized place for data sanitization
- Consistent data formatting
- Secure handling of sensitive fields

### 6. Maintainability

- Easy to add new repositories
- Simple to extend existing repositories
- Clear separation between read and write operations

## Best Practices

### 1. Error Handling

Always wrap database operations in try-catch blocks and throw appropriate custom errors:

```typescript
try {
  const result = await prisma.user.create({ data });
  return this.transform(result);
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific error cases
  }
  throw new RepositoryError("Operation failed", error);
}
```

### 2. Data Transformation

Implement consistent data transformation methods:

```typescript
private transform(data: DatabaseModel): ResponseModel {
    // Transform database model to response model
    return {
    // ... transformed fields
    };
}
```

### 3. Input Validation

Validate inputs before database operations:

```typescript
validateInput(data: CreateInput): void {
  // Validate input data
  if (!data.required_field) {
    throw new ValidationError("required_field is required");
  }
}
```

### Implementation Example

Here's a complete example of implementing a new repository:

```typescript
// types.ts
export interface IProductRepository
  extends IBaseRepository<Product, CreateInput, UpdateInput> {
  findByCategory(category: string): Promise<Product[]>;
}

// product.repository.ts
export class ProductRepository implements IProductRepository {
  async findById(id: string): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({ where: { id } });
    } catch (error) {
      throw new RepositoryError("Failed to fetch product", error);
    }
  }

  async findByCategory(category: string): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: { category },
      });
    } catch (error) {
      throw new RepositoryError("Failed to fetch products by category", error);
    }
  }

  // ... other required methods
}
```

## Testing

Repositories should be thoroughly tested:

```typescript
describe("UserRepository", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  it("should find user by id", async () => {
    const result = await repository.findById("123");
    expect(result).toBeDefined();
  });

  it("should throw NotFoundError for non-existent user", async () => {
    await expect(repository.findById("999")).rejects.toThrow(NotFoundError);
  });
});
```

## Common Pitfalls

### 1. Exposing Database Details

Don't expose database-specific errors to upper layers
Transform database models to response models

### 2. Inconsistent Error Handling

Use custom error types consistently
Document error scenarios

### 3. Missing Type Safety

Always use TypeScript interfaces
Avoid using any type

### 4. Performance Issues

Be mindful of N+1 query problems
Use appropriate database indexes
Implement pagination where necessary

## Advanced Patterns

### Repository Factory

```typescript
export class RepositoryFactory {
  static createUserRepository(): IUserRepository {
    return new UserRepository();
  }

  static createProductRepository(): IProductRepository {
    return new ProductRepository();
  }
}
```

### 2. Repository Decorators

```typescript
export function LoggingDecorator<T extends IBaseRepository<any, any, any>>(
  repository: T,
): T {
  return new Proxy(repository, {
    get(target, prop) {
      const originalMethod = target[prop];
      if (typeof originalMethod === "function") {
        return async (...args: any[]) => {
          console.log(`Calling ${String(prop)} with:`, args);
          const result = await originalMethod.apply(target, args);
          console.log(`Result from ${String(prop)}:`, result);
          return result;
        };
      }
      return originalMethod;
    },
  });
}
```
