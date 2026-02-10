# next-template

Next.js 16 starter template with MUI 7, Zustand 5, next-intl 4, TypeScript 5, React 19.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run lint-fix` | ESLint auto-fix |

## Architecture

- **Next.js 16 App Router** — all routes under `src/app/[locale]/`
- **Server components by default** — `"use client"` only when needed
- **MUI 7 + Emotion** — CSS-in-JS, theme with CSS variables, light/dark mode via `data-color-scheme`
- **Zustand 5** — slice-based, state only in slices, mutations via `setAppStore()`, external selectors
- **next-intl 4** — locale routing (en, hy, ru), middleware in `src/proxy.ts`
- **TypeScript 5 strict** — no `any`, `import type` for types, interfaces for props

## Project Structure

```
src/app/[locale]/           # Locale-prefixed routes
src/components/             # Each component: Component.tsx + styled.tsx + index.ts
src/hooks/                  # Custom hooks
src/i18n/                   # next-intl config
src/providers/              # ThemeProvider
src/store/                  # Zustand store + slices (state only)
src/theme.ts                # MUI theme
messages/                   # Translation JSON files
```

## Key Conventions

- **Component structure** — each component in own directory: `Component.tsx` (UI), `styled.tsx` (styles), `index.ts` (re-export)
- **Function expressions** — `const fn = () => {}`, never `function fn() {}` (exception: Next.js pages/layouts)
- **Object arguments** — functions with 2+ params use single object
- **Import order** — Framework > Third-party > Local (enforced by ESLint)
- **Naming** — PascalCase components, camelCase hooks (`use` prefix), UPPER_SNAKE_CASE constants
- **No business logic in components** — extract to hooks or services
- **Zustand selectors outside components** — prevents unnecessary re-renders
- **Translations** — `useTranslator()` client-side, `getTranslations()` server-side
- **`styled.tsx` files** always need `"use client"` directive
- **Path alias** — `@/*` resolves to `./src/*`

## Zustand Pattern

```typescript
// Selector outside component
const selector = (store: IAppStore) => ({ counter: store.counter });
const MyComponent = () => {
  const { counter } = useAppStore(selector);
};
// Mutate via setAppStore
setAppStore((s) => ({ counter: s.counter + 1 }));
```

## Detailed Docs

See `docs/` directory for engineering principles, component patterns, store architecture, and integration details.
