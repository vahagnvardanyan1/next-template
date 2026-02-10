# Engineering Principles — Code Rules (1–8)

Core rules for writing clean frontend code in next-template. For architecture rules, see [Part 2](./architecture.md).

## 1. Argument Passing as Object

Functions with two or more arguments must accept a single object. One argument may remain positional if it represents the primary subject.

```typescript
// ✅
const createUser = ({ name, email, role }: CreateUserParams) => { /* ... */ };
const formatDate = (date: Date, { locale }: FormatOptions) => { /* ... */ };

// ❌
const createUser = (name: string, email: string, role: string) => { /* ... */ };
```

## 2. Reusable Code (DRY)

Never duplicate logic or UI. Extract repeated behavior into reusable components, hooks, or utilities.

```typescript
// ✅ Extracted into a reusable hook
const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle] as const;
};
```

## 3. One Responsibility per File

Each file must have one clear responsibility. Separate UI, logic, data access, and utilities. Avoid "god files".

```
src/components/UserCard/
  UserCard.tsx        # UI only
  styled.tsx          # Styled components
  index.ts            # Re-export
```

## 4. Clean & Declarative Logic

Functions must be small, focused, and declarative. Avoid deeply nested logic. Delegate complexity to helpers.

```typescript
// ✅ Declarative
const canUserEdit = ({ user, document }: CanEditParams) =>
  user.role === "admin" || document.ownerId === user.id;

// ❌ Nested imperative
const canUserEdit = (user, doc) => {
  if (user) {
    if (user.role === "admin") return true;
    else if (doc.ownerId === user.id) return true;
  }
  return false;
};
```

## 5. Reusable UI Components

Extract repeated UI patterns into stateless, configurable components.

```typescript
interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => (
  <CardRoot>
    {icon && <IconWrapper>{icon}</IconWrapper>}
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2">{description}</Typography>
  </CardRoot>
);
```

## 6. Logic Separation (Critical)

UI components must **not** contain business logic. Separate:

- State management → store slices
- API calls → services
- Validation → utilities
- Side effects → hooks

```typescript
// ✅ Logic in a hook, UI stays clean
const useAuth = () => {
  const { user } = useAppStore(authSelector);
  const login = (credentials: Credentials) => { /* ... */ };
  return { user, login };
};

const LoginPage = () => {
  const { user, login } = useAuth();
  return <LoginForm onSubmit={login} />;
};
```

## 7. Functions

Always use **function expressions**, never function declarations.

```typescript
// ✅
const handleClick = () => { /* ... */ };

// ❌
function handleClick() { /* ... */ }
```

**Exception:** `export default function` for Next.js page/layout components.

## 8. Imports

Group imports with one empty line between groups:

1. **Framework** — `react`, `next/*`, `next-intl/*`
2. **Third-party** — `@mui/*`, `zustand`, etc.
3. **Local** — `@/store`, `@/components/*`, `./styled`

```typescript
import { useState } from "react";

import Box from "@mui/material/Box";

import { useAppStore } from "@/store";
import type { IAppStore } from "@/store";
import { CardRoot } from "./styled";
```

Use `import type` for type-only imports. Prefer named imports.

## See Also

- [Part 2 — Architecture Rules (9–16)](./architecture.md)
- [Component Structure](./component-structure.md) — how to organize components
- [Store](../reference/store.md) — Zustand patterns
