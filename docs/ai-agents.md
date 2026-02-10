# AI Agent Documentation Strategy

This project includes documentation files for multiple AI coding agents. Each file targets a specific tool while referencing the shared `docs/` directory for detailed guidance.

## File Map

| File | AI Tool(s) | Purpose |
|------|-----------|---------|
| `CLAUDE.md` | Claude Code (CLI, VS Code, JetBrains) | Project context, conventions, gotchas, pointers to detailed docs |
| `AGENTS.md` | OpenAI Codex, GitHub Copilot, Google Jules, Cursor, Aider, Devin, Windsurf, 20+ tools | Universal standard — project overview, commands, architecture, conventions |
| `GEMINI.md` | Google Gemini CLI, Gemini Code Assist | Project context and conventions |
| `.github/copilot-instructions.md` | GitHub Copilot | Repository-wide instructions |
| `.cursor/rules/*.mdc` | Cursor | Scoped rules with auto-attach by file pattern |
| `docs/` | All agents (referenced from above files) | Detailed engineering principles, patterns, and reference material |

## File Hierarchy

### CLAUDE.md

Claude Code reads `CLAUDE.md` files at multiple levels:

1. `~/.claude/CLAUDE.md` — global preferences
2. `<project-root>/CLAUDE.md` — shared project context (committed)
3. `<subdirectory>/CLAUDE.md` — module-specific guidance
4. `*.local.md` variants — personal, git-ignored

### AGENTS.md

The emerging universal standard, supported by 60,000+ open-source repositories and 20+ AI tools. Follows the same hierarchy concept: project root for shared context.

### .cursor/rules/

Cursor uses `.mdc` files with YAML frontmatter:

- `alwaysApply: true` — active in every context
- `globs: "*.ts,*.tsx"` — auto-attach when matching files are open
- `description` only — AI decides when to apply

Current rules:

| File | Scope | Applies To |
|------|-------|------------|
| `project-setup.mdc` | Always on | Every context |
| `typescript-conventions.mdc` | Auto-attach | `*.ts`, `*.tsx` files |
| `react-patterns.mdc` | Auto-attach | `src/components/**/*.tsx`, `src/app/**/*.tsx` |
| `zustand-store.mdc` | Auto-attach | `src/store/**/*.ts` |

### .github/copilot-instructions.md

GitHub Copilot reads this file for repository-wide instructions. Path-specific instructions can be added in `.github/instructions/<name>.instructions.md`.

## Writing Guidelines

### Do

- **Be specific** — "use `interface` for props" not "follow best practices"
- **Include commands in backticks** — agents can copy-paste and execute
- **Front-load critical info** — most important conventions first
- **Use code examples** — show patterns, not just describe them
- **Document the WHY** — explain reasoning behind architectural decisions
- **Keep files concise** — every token consumes context window in every session

### Do Not

- **Duplicate linter rules** — ESLint/Prettier enforce formatting; don't repeat in agent docs
- **Write kitchen-sink docs** — if removing a line wouldn't cause agent mistakes, cut it
- **Include secrets** — never put API keys or credentials in these files
- **Use vague language** — "be careful" is not actionable

### Length Targets

| File | Target |
|------|--------|
| `CLAUDE.md` | Under 300 lines |
| `AGENTS.md` | Under 150 lines |
| `GEMINI.md` | Under 100 lines |
| `.github/copilot-instructions.md` | Under 2 pages |
| `.cursor/rules/*.mdc` | Under 500 lines each |

## Maintenance

- Update these files when conventions change
- After major refactors, verify all agent docs reflect the new structure
- Test by starting a new AI session and checking if the agent follows conventions correctly
- Treat agent docs as living documents — stale instructions cause more harm than no instructions

## See Also

- [Getting Started](getting-started/getting-started.md) — project setup and architecture
- [Engineering Principles](contributing/code.md) — code rules 1-8
- [Architecture Rules](contributing/architecture.md) — rules 9-16
