# next-template

Next.js 16 starter template with MUI 7, Zustand 5, next-intl 4, TypeScript 5, React 19.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run lint-fix` | ESLint auto-fix |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── [locale]/           # Locale-based routing (en, hy, ru)
│       ├── layout.tsx      # Locale layout with providers
│       └── page.tsx        # Home page
├── components/             # Reusable UI components (each in own directory)
├── hooks/                  # Custom React hooks
├── i18n/                   # next-intl config (routing, request, navigation)
├── providers/              # Context providers (ThemeProvider)
├── store/                  # Zustand store + slices
│   ├── index.ts            # Main store composition
│   └── slices/             # State slices (state only, no actions)
├── proxy.ts                # i18n middleware
└── theme.ts                # MUI theme (CSS variables, light/dark)
messages/                   # Translation JSON files (en.json, hy.json, ru.json)
```

## Architecture Decisions

- **App Router only** — no Pages Router. All routes under `src/app/[locale]/`.
- **Server components by default** — add `"use client"` only when hooks, event handlers, or browser APIs are needed.
- **Emotion CSS-in-JS** — MUI's styling engine. `AppRouterCacheProvider` handles SSR style injection.
- **Zustand slices hold state only** — no setters or actions in slices. Mutations via `setAppStore()`, reads via external selectors.
- **next-intl middleware** — handles locale detection and redirects via `src/proxy.ts`.
- **MUI theme with CSS variables** — uses `data-color-scheme` attribute for light/dark mode toggle.

## Component Pattern

Every component follows this structure:

```
src/components/MyComponent/
  MyComponent.tsx    # UI only — props interface, markup, no business logic
  styled.tsx         # Styled MUI components via styled() from @mui/material/styles
  index.ts           # Named re-export: export { MyComponent } from "./MyComponent"
```

## Code Conventions

- **Function expressions only** — `const fn = () => {}`, never `function fn() {}`. Exception: `export default function` for Next.js pages/layouts.
- **Object arguments** — functions with 2+ parameters use a single object parameter.
- **Import order** — Framework (react, next) > Third-party (@mui, zustand) > Local (@/, ./) — enforced by ESLint.
- **Import type** — use `import type` for type-only imports.
- **Naming** — PascalCase components, camelCase hooks (use prefix), UPPER_SNAKE_CASE constants, `I` prefix for store interfaces (`IAppStore`).

## Zustand Store

```typescript
// Reading state — define selector OUTSIDE component
const selector = (store: IAppStore) => ({ counter: store.counter });
const MyComponent = () => {
  const { counter } = useAppStore(selector);
};

// Mutating state — use setAppStore directly
setAppStore({ sidebarOpen: true });
setAppStore((s) => ({ counter: s.counter + 1 }));

// Reading outside React
const value = getAppStore().sidebarOpen;
```

## Translations

- **Client components** — `useTranslator()` hook
- **Server components** — `getTranslations()` async function
- Translation files in `messages/` directory (en.json, hy.json, ru.json)

## Gotchas

- `styled.tsx` files always need `"use client"` directive.
- Never put business logic in UI components — extract to hooks or services.
- Zustand selectors must be defined outside components to prevent re-renders.
- The `@/*` path alias resolves to `./src/*`.
- ESLint enforces max 250 lines per file, max nesting depth of 3, max complexity of 10.
- No `console.log` — only `console.warn` and `console.error` are allowed.

## Detailed Documentation

For deeper reference, see:

- `docs/getting-started/getting-started.md` — full setup, tech stack, request flow, theming
- `docs/contributing/code.md` — Engineering Principles rules 1-8 (code patterns)
- `docs/contributing/architecture.md` — Engineering Principles rules 9-16 (architecture)
- `docs/contributing/component-structure.md` — component organization with examples
- `docs/contributing/eslint.md` — ESLint rules mapped to principles
- `docs/reference/store.md` — Zustand architecture, adding slices
- `docs/reference/integrations.md` — MUI, Zustand, Emotion, next-intl, Roboto details
