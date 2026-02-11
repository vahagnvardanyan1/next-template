# next-template

Next.js 16 starter template with MUI 7, Zustand 5, next-intl 4, TypeScript 5, and React 19.

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, server components by default
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** — type safety
- **[MUI 7](https://mui.com/)** — component library with Emotion CSS-in-JS
- **[Zustand 5](https://zustand.docs.pmnd.rs/)** — lightweight state management
- **[next-intl 4](https://next-intl.dev/)** — internationalization (en, hy, ru)
- **[ESLint 9](https://eslint.org/) + [Prettier](https://prettier.io/)** — linting and formatting

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
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

## Architecture

- **App Router only** — all routes under `src/app/[locale]/`
- **Server components by default** — add `"use client"` only when hooks, event handlers, or browser APIs are needed
- **Emotion CSS-in-JS** — MUI's styling engine with `AppRouterCacheProvider` for SSR
- **Zustand slices hold state only** — no setters or actions in slices; mutations via `setAppStore()`, reads via external selectors
- **next-intl middleware** — locale detection and redirects via `src/proxy.ts`
- **MUI theme with CSS variables** — `data-color-scheme` attribute for light/dark mode

## Documentation

For detailed guides, see the `docs/` directory:

- [Getting Started](docs/getting-started/getting-started.md) — setup, tech stack, request flow, theming
- [Code Conventions](docs/contributing/code.md) — engineering principles (code patterns)
- [Architecture](docs/contributing/architecture.md) — engineering principles (architecture)
- [Component Structure](docs/contributing/component-structure.md) — component organization with examples
- [ESLint Rules](docs/contributing/eslint.md) — ESLint rules mapped to principles
- [Store Reference](docs/reference/store.md) — Zustand architecture, adding slices
- [Integrations](docs/reference/integrations.md) — MUI, Zustand, Emotion, next-intl details
