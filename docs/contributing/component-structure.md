# Component Structure

How to organize React components in next-template.

## Directory Layout

Each component lives in its own directory:

```
src/components/
  └── MyComponent/
      ├── MyComponent.tsx      # UI only
      ├── styled.tsx           # Styled MUI components
      └── index.ts             # Re-export
```

## Component File

```typescript
// src/components/MyComponent/MyComponent.tsx
"use client"; // Only if the component uses hooks or browser APIs

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { StyledContainer } from "./styled";

interface MyComponentProps {
  title: string;
}

export const MyComponent = ({ title }: MyComponentProps) => (
  <StyledContainer>
    <Typography variant="h6">{title}</Typography>
  </StyledContainer>
);
```

## Styled File

```typescript
// src/components/MyComponent/styled.tsx
"use client";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

// When wrapping a polymorphic component (one that accepts `component` prop),
// cast to preserve the prop type:
export const Title = styled(Typography)({
  marginBottom: 12,
}) as typeof Typography;
```

## Index File

```typescript
// src/components/MyComponent/index.ts
export { MyComponent } from "./MyComponent";
```

## Store Usage

Define selectors **outside** the component. Mutate via `setAppStore`:

```typescript
"use client";

import { useAppStore, setAppStore } from "@/store";
import type { IAppStore } from "@/store";
import { CounterButton, CounterValue } from "./styled";

const selector = (store: IAppStore) => ({
  counter: store.counter,
});

export const CounterDemo = () => {
  const { counter } = useAppStore(selector);

  return (
    <>
      <CounterValue>{counter}</CounterValue>
      <CounterButton onClick={() => setAppStore((s) => ({ counter: s.counter + 1 }))}>
        +
      </CounterButton>
    </>
  );
}
```

## Rules

- **Server vs Client** — server components by default. Add `"use client"` only for hooks, event handlers, or browser APIs.
- **Props** — define a TypeScript interface. Export it if other components need it.
- **Styling** — always use a separate `styled.tsx`. Avoid inline `sx` style objects where possible.
- **Store** — external selectors, `setAppStore` for mutations, no actions in the store.
- **Translations** — `useTranslator()` in client components, `getTranslations()` in server components.
- **Functions** — use function expressions. `export default function` is acceptable for Next.js pages/layouts.

For logic separation, DRY, reusable components, and lazy loading rules, see Engineering Principles [Part 1](./code.md) and [Part 2](./architecture.md).

## See Also

- [Engineering Principles — Code Rules (1–8)](./code.md)
- [Engineering Principles — Architecture Rules (9–16)](./architecture.md)
- [Store](../reference/store.md) — Zustand state management
- [Getting Started](../getting-started/getting-started.md) — project setup and structure
