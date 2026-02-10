# Store

State management using Zustand with a slice-based architecture.

## Architecture

The store uses `createWithEqualityFn` from `zustand/traditional` with a custom equality function combining strict equality and `shallow` comparison. This prevents unnecessary re-renders.

Slices hold **state only** — no setters or actions. Mutations go through `setAppStore()`.

```
src/store/
  index.ts              # Main store — composes all slices
  slices/
    ui.ts               # UI state (sidebar, counter, etc.)
```

## Main Store

**Path:** `src/store/index.ts`

```typescript
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import createUiSlice, { type IUiStore } from "./slices/ui";

export type IAppStore = IUiStore;

const compare = <T>(a: T, b: T) => a === b || shallow(a, b);

export const useAppStore = createWithEqualityFn<IAppStore>(
  (...args) => ({
    ...createUiSlice(...args),
  }),
  compare
);

export const getAppStore = useAppStore.getState;
export const setAppStore = useAppStore.setState;
```

## UI Slice

**Path:** `src/store/slices/ui.ts`

| Property | Type | Default |
|----------|------|---------|
| `sidebarOpen` | `boolean` | `false` |
| `counter` | `number` | `0` |

## Usage

Define a selector **outside** the component, then pass it to `useAppStore`:

```typescript
"use client";

import { useAppStore, setAppStore } from "@/store";
import type { IAppStore } from "@/store";

const selector = (store: IAppStore) => ({
  sidebarOpen: store.sidebarOpen,
});

const Sidebar = () => {
  const { sidebarOpen } = useAppStore(selector);

  return (
    <Drawer
      open={sidebarOpen}
      onClose={() => setAppStore({ sidebarOpen: false })}
    />
  );
};
```

### Mutating State

Use `setAppStore` directly — no actions in the slice:

```typescript
setAppStore({ sidebarOpen: true });
setAppStore((state) => ({ sidebarOpen: !state.sidebarOpen }));
```

### Reading Outside React

```typescript
import { getAppStore } from "@/store";

const isOpen = getAppStore().sidebarOpen;
```

## Adding a New Slice

1. Create `src/store/slices/mySlice.ts` — state only:

```typescript
import type { StateCreator } from "zustand";
import type { IAppStore } from "../index";

export interface IMySlice {
  count: number;
  items: string[];
}

const createMySlice: StateCreator<IAppStore, [], [], IMySlice> = () => ({
  count: 0,
  items: [],
});

export default createMySlice;
```

2. Compose it in `src/store/index.ts`:

```typescript
import createMySlice, { type IMySlice } from "./slices/mySlice";

export type IAppStore = IUiStore & IMySlice;

export const useAppStore = createWithEqualityFn<IAppStore>(
  (...args) => ({
    ...createUiSlice(...args),
    ...createMySlice(...args),
  }),
  compare
);
```

3. Use with an external selector:

```typescript
const selector = (store: IAppStore) => ({
  count: store.count,
  items: store.items,
});

const MyComponent = () => {
  const { count, items } = useAppStore(selector);
  // mutate via setAppStore({ count: count + 1 })
};
```

## See Also

- [Integrations](integrations.md) — Zustand package details
- [Component Structure](../contributing/component-structure.md) — store usage in components
- [Engineering Principles](../contributing/code.md) — state management and side effects rules
- [Getting Started](../getting-started/getting-started.md) — project structure overview
