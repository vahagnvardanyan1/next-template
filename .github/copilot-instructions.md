# next-template

Next.js 16 starter template with MUI 7, Zustand 5, next-intl 4, TypeScript 5, React 19.

## Build & Run

```bash
npm install
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run lint-fix     # ESLint auto-fix
```

## Architecture

- **Next.js 16 App Router** — all routes under `src/app/[locale]/` (en, hy, ru)
- **Server components by default** — `"use client"` only for hooks/event handlers/browser APIs
- **MUI 7 + Emotion** — CSS-in-JS, theme with CSS variables, `data-color-scheme` for light/dark
- **Zustand 5** — slice-based store, state only in slices, mutations via `setAppStore()`
- **next-intl 4** — locale routing, middleware in `src/proxy.ts`
- **TypeScript 5 strict** — no `any`, `import type` for types, interfaces for props

## Component Pattern

Each component in own directory:

- `Component.tsx` — UI only, TypeScript props interface, no business logic
- `styled.tsx` — styled MUI components (`"use client"` required), use `styled()` from `@mui/material/styles`
- `index.ts` — named re-export

## Conventions

- Function expressions (`const fn = () => {}`), never declarations (exception: Next.js pages/layouts)
- Functions with 2+ params use single object argument
- Import order: Framework > Third-party > Local (blank lines between groups)
- `import type` for type-only imports
- PascalCase components, camelCase hooks (`use` prefix), UPPER_SNAKE_CASE constants
- Zustand selectors defined outside components
- Mutations via `setAppStore()`, reads via `useAppStore(selector)`
- Translations: `useTranslator()` client, `getTranslations()` server
- Path alias: `@/*` = `./src/*`
- Max 250 lines/file, max nesting depth 3, no `console.log`

## Detailed Docs

See `docs/` directory for complete engineering principles, store patterns, and integration details.
