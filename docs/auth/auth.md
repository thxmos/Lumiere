# Authentication Utilities in Server Actions

## `validateServerSession`

Use when:

- You want to check if a user is logged in but want to handle the null case yourself
- You need optional authentication (e.g., features that work differently for logged-in vs anonymous users)
- You want custom error handling or redirection logic

Example:

```typescript
async function myAction() {
  const user = await validateServerSession();
  if (user) {
    // Show personalized content
    return getPersonalizedData(user);
  } else {
    // Show public content
    return getPublicData();
  }
}
```

## `requireUser`

Use when:

- You absolutely need an authenticated user
- You want to throw an error if the user isn't authenticated
- For actions that must have a user and can't proceed without one
- As a building block for other auth utilities (like withAuth)

Example:

```typescript
async function protectedAction() {
  const user = await requireUser(); // Will throw if no user
  // We know we have a user here
  return getUserData(user.id);
}
```

## Best practices:

```typescript
// ✅ Good: Using validateServerSession when you need flexibility
async function mixedContentAction() {
  const user = await validateServerSession();
  return {
    publicData: await getPublicItems(),
    privateData: user ? await getUserItems(user.id) : null,
  };
}

// ✅ Good: Using requireUser for must-be-authenticated actions
async function userSettingsAction() {
  const user = await requireUser(); // Explicitly shows this needs auth
  return await getUserSettings(user.id);
}

// ✅ Good: Using withAuth for most server actions
export const updateProfile = withAuth(async (user, data) => {
  return await updateUserProfile(user.id, data);
});

// ❌ Bad: Don't check auth multiple times
async function badAction() {
  const session = await validateServerSession(); // Don't do this
  if (!session) throw new Error("No auth"); // Just use requireUser instead
  return getUserData(session.user.id);
}
```

Remember:

- `validateServerSession` is more flexible but requires you to handle the null case
- `requireUser` is more direct and makes it clear authentication is required
- `withAuth` is the most convenient for server actions
