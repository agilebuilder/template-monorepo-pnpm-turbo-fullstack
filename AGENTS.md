# AGENTS.md — <%= projectName %>

Navigation guide for AI coding agents. <%= description %>

## Project Overview

A full-stack TypeScript Monorepo managed by pnpm workspace + Turborepo. All internal packages are scoped under `<%= scope %>`.

## Project Structure

- `apps/web/` — Vite + React 18 frontend. Entry `src/main.tsx`, root component `src/App.tsx`. Dev port 5173; `/api` and `/health` are proxied to 3001.
- `apps/api/` — Express HTTP service. Entry `src/index.ts`, fixed port 3001. `tsx watch` in dev; built with `tsc` (NodeNext ESM output to `dist/`).
- `packages/ui/` — Shared React component library, built with tsup (ESM + CJS + d.ts). Put new components in `src/` and export them from `src/index.ts`.
- `packages/shared/` — Pure utilities and types (no React dependency), built with tsup; Vitest tests live in `test/`.
- `packages/tsconfig/` — Shared tsconfigs: `base.json` (Node/generic), `react.json` (DOM + react-jsx). Subpackages reference them via `"extends": "<%= scope %>/tsconfig/base.json"`.

## Conventions

- Use **pnpm** exclusively; do not commit lock files other than pnpm's — `pnpm-lock.yaml` should be committed.
- Internal dependencies always use `"workspace:*"` version ranges.
- New package naming: apps go in `apps/` (short names like `web`, `api`); libraries go in `packages/` under the `<%= scope %>/` scope.
- Code style: ESLint flat config (root `eslint.config.js`, shared by subpackages) + Prettier (2 spaces, LF). Unused variables are exempted with a `_` prefix.
- TypeScript strict mode (`strict` + `noUncheckedIndexedAccess`); library packages must emit d.ts files.
- React components are function components with props typed as TypeScript interfaces.
- UI copy is written in English.
- Do not change the `turbo.json` pipeline topology without updating the root `package.json` scripts accordingly.

## Common Commands

```bash
pnpm install                      # install all dependencies
pnpm dev                          # start all dev tasks in parallel
pnpm build                        # build all packages in topo order (turbo cache)
pnpm lint / pnpm test             # repo-wide lint / test
pnpm build --filter=web           # build only web and its internal dependencies
pnpm --filter <%= scope %>/shared test   # run only the shared tests
pnpm format                       # Prettier formatting across the repo
```

## Guidance for Changes

- Check the blast radius before touching shared code: `packages/shared` is depended on by both web and api; `packages/ui` is depended on by web.
- Build order is guaranteed by Turborepo via `dependsOn: ["^build"]`; do not bypass it with hand-written scripts.
- When adding new environment variables, review `.gitignore` so `.env` files are never committed.
