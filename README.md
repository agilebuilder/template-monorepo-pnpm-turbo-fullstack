# <%= projectName %>

> <%= description %>

A full-stack TypeScript Monorepo template based on **pnpm workspace + Turborepo**.

## Tech Stack

- Package management and orchestration: pnpm workspace, Turborepo (build cache and task pipelines)
- Frontend: Vite + React 18 + TypeScript
- Backend: Node.js + Express + TypeScript (tsx hot reload in dev)
- Shared packages: built with tsup (ESM + CJS + d.ts outputs)
- Code style: ESLint 9 (flat config) + Prettier

## Project Structure

```
<%= projectName %>/
├── apps/
│   ├── web/                # Vite + React frontend (dev port 5173, /api proxied to 3001)
│   └── api/                # Lightweight Express HTTP service (fixed port 3001)
├── packages/
│   ├── ui/                 # Shared React component library (tsup build)
│   ├── shared/             # Shared utilities and type definitions
│   └── tsconfig/           # Shared tsconfig bases (base.json / react.json)
├── package.json            # Root package (private; unified script entry points)
├── pnpm-workspace.yaml     # Workspace declaration
├── turbo.json              # Turborepo task pipelines: build / lint / test / dev
├── eslint.config.js        # Root ESLint flat config shared by subpackages
└── .npmrc                  # pnpm behavior config
```

Internal packages are scoped under `<%= scope %>`, e.g. `<%= scope %>/ui`, `<%= scope %>/shared`, `<%= scope %>/tsconfig`. They reference each other inside the workspace via `"<%= scope %>/ui": "workspace:*"`.

## Quick Start

Generate a project from this template with the AgileBuilder CLI:

```bash
ag create --git-url <repo-url> --target <directory>
```

Then enter the project directory:

```bash
cd <directory>
pnpm install
pnpm dev        # start web (5173) and api (3001) in parallel
```

Open http://localhost:5173 in a browser; the page calls `http://localhost:3001/api/hello` through the Vite proxy.

## Template Variables

| Variable | Description | Default |
| --- | --- | --- |
| `projectName` | Project name (root package.json `name`) | `demo-monorepo` |
| `scope` | npm scope for internal packages; package names look like `<%= scope %>/ui` | `@demo` |
| `description` | Project description | A full-stack monorepo |
| `author` | Author | (empty) |

## Common Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all dev tasks in parallel via Turborepo |
| `pnpm build` | Build all packages in dependency order (with cache) |
| `pnpm lint` | Run ESLint in every package |
| `pnpm test` | Run unit tests (packages/shared uses Vitest) |
| `pnpm format` | Prettier formatting across the repo |
| `pnpm clean` | Remove build outputs and node_modules |

Use Turborepo filtering for single-package commands, e.g. `pnpm build --filter=web`, `pnpm dev --filter=api`.

## API

`apps/api` ships two endpoints (fixed port 3001):

- `GET /health`: health check returning `{ status, uptime }`
- `GET /api/hello?name=xxx`: returns a greeting built by `<%= scope %>/shared`

## License

MIT
