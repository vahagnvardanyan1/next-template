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

- **Next.js 16 App Router** — all routes under `src/app/[locale]/` (en, hy, ru)
- **Server components by default** — `"use client"` only for hooks, event handlers, browser APIs
- **MUI 7 + Emotion** — CSS-in-JS, theme with CSS variables, `data-color-scheme` for light/dark
- **Zustand 5** — slice-based, state only in slices, mutations via `setAppStore()`, external selectors
- **next-intl 4** — locale routing, middleware in `src/proxy.ts`
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

- **Component pattern** — own directory: `Component.tsx` (UI), `styled.tsx` (styles with `"use client"`), `index.ts` (re-export)
- **Function expressions** — `const fn = () => {}`, never `function fn() {}` (exception: Next.js pages/layouts)
- **Object arguments** — functions with 2+ params use single object
- **Import order** — Framework > Third-party > Local (blank lines between groups)
- **Naming** — PascalCase components, camelCase hooks, UPPER_SNAKE_CASE constants, `I` prefix for store interfaces
- **No business logic in components** — extract to hooks or services
- **Zustand selectors outside components** — prevent re-renders
- **Translations** — `useTranslator()` client, `getTranslations()` server
- **Path alias** — `@/*` resolves to `./src/*`

## Zustand Pattern

```typescript
const selector = (store: IAppStore) => ({ counter: store.counter });
const MyComponent = () => {
  const { counter } = useAppStore(selector);
};
setAppStore((s) => ({ counter: s.counter + 1 }));
```

## Detailed Docs

See `docs/` directory for engineering principles, store architecture, and integration details.
