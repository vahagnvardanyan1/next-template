# Getting Started

## Prerequisites

- **Node.js** 20 or later
- **npm**, **yarn**, or **pnpm**

## Setup

```bash
git clone <repo-url>
cd next-template
npm install
cp .env.example .env.local   # if applicable
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server with Fast Refresh |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16 |
| UI | MUI (Material UI) | 7 |
| Styling | Emotion (CSS-in-JS) | 11 |
| State | Zustand | 5 |
| i18n | next-intl | 4 |
| Language | TypeScript | 5 |
| Runtime | React | 19 |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── [locale]/               # Locale-based routing
│       ├── layout.tsx          # Locale layout (providers, header)
│       └── page.tsx            # Home page
├── components/                 # UI components
├── hooks/                      # Custom hooks
├── i18n/                       # Internationalization config
├── providers/                  # Context providers
├── store/                      # Zustand store + slices
│   ├── index.ts
│   └── slices/
└── theme.ts                    # MUI theme
messages/                       # Translation files (en, hy, ru)
```

## Request Flow

```
Browser
  │
  ▼
next-intl Middleware (locale detection & redirect)
  │
  ▼
[locale]/layout.tsx
  ├── NextIntlClientProvider (i18n messages)
  ├── ThemeProvider (MUI theme + color scheme)
  ├── Header (AppBar, LanguageSwitcher, theme toggle)
  └── page.tsx (route content)
```

## Routing

Routes are locale-prefixed via the `[locale]` dynamic segment:

- `/en` — English
- `/hy` — Armenian
- `/ru` — Russian

The middleware in `src/proxy.ts` handles locale detection and redirects.

## Theming

The MUI theme (`src/theme.ts`) uses CSS variables with `data-color-scheme` attribute for light/dark mode. Toggle via `useColorScheme()` in the Header.

| Token | Font | Weight |
|-------|------|--------|
| h1–h6 | Roboto | 300–800 |
| body1/body2 | Roboto | 400 |
| button | Roboto | 500 |

Font loaded via `next/font/google` and referenced as `--font-roboto`. Spacing uses `theme.spacing()` (8px base). Icons from `@mui/icons-material`.

Extend the theme in `src/theme.ts` — see [MUI theming docs](https://mui.com/material-ui/customization/theming/).

## See Also

- [Integrations](../reference/integrations.md) — third-party libraries and config
- [Store](../reference/store.md) — Zustand state management
- [Component Structure](../contributing/component-structure.md) — how to organize components
- [Engineering Principles](../contributing/code.md) — 16 frontend rules
