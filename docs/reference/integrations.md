# Integrations

Third-party libraries and services integrated into next-template.

## MUI (Material UI)

**Package:** `@mui/material` v7

Provides the component library, theming system, and styling utilities.

| Package | Purpose |
|---------|---------|
| `@mui/material` | Core components and theme |
| `@mui/icons-material` | Material Design icons |
| `@mui/material-nextjs` | Next.js App Router integration |

**Setup:** Theme configured in `src/theme.ts`, applied via `src/providers/ThemeProvider/`.

## Zustand

**Package:** `zustand` v5

Lightweight state management with a slice-based architecture.

| Import | Purpose |
|--------|---------|
| `zustand/traditional` | `createWithEqualityFn` for custom equality |
| `zustand/shallow` | Shallow comparison to prevent unnecessary re-renders |

**Setup:** Store defined in `src/store/index.ts`, slices in `src/store/slices/`. See [Store reference](store.md) for details.

## Emotion

**Packages:** `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `@emotion/server`

CSS-in-JS engine used by MUI. The `AppRouterCacheProvider` from `@mui/material-nextjs` manages Emotion's style cache for SSR.

## next-intl

**Package:** `next-intl` v4

Handles internationalization with:

- Locale-based routing via middleware
- Server-side translations via `getTranslations()`
- Client-side translations via `useTranslations()`
- Navigation utilities (`Link`, `useRouter`, `usePathname`, `redirect`)

**Config files:** `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`, `src/proxy.ts`

## Roboto Font

**Package:** `@fontsource/roboto`

Self-hosted Roboto font with weights 300, 400, 500, 700 and latin + cyrillic subsets. Imported in the locale layout and referenced via CSS variable `--font-roboto`.

## See Also

- [Getting Started](../getting-started/getting-started.md) — setup, tech stack, theming
- [Store](store.md) — Zustand architecture and usage
- [Component Structure](../contributing/component-structure.md) — how to organize components
- [Engineering Principles](../contributing/code.md) — 16 frontend rules
