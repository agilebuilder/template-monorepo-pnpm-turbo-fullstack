# AGENTS.md — <%= projectName %>

给 AI 编码代理的项目导航指南。<%= description %>

## 项目概览

pnpm workspace + Turborepo 管理的全栈 TypeScript Monorepo。所有内部包以 `<%= scope %>` 为 npm 作用域。

## 目录结构

- `apps/web/` — Vite + React 18 前端。入口 `src/main.tsx`，根组件 `src/App.tsx`。开发端口 5173，`/api` 与 `/health` 由 Vite 代理转发到 3001。
- `apps/api/` — Express HTTP 服务。入口 `src/index.ts`，端口固定 3001。dev 用 `tsx watch`，构建用 `tsc`（NodeNext ESM 输出到 `dist/`）。
- `packages/ui/` — React 共享组件库，tsup 构建 ESM+CJS+d.ts。新组件放 `src/` 并从 `src/index.ts` 导出。
- `packages/shared/` — 纯工具函数与类型（不依赖 React），tsup 构建，Vitest 测试放 `test/`。
- `packages/tsconfig/` — 共享 tsconfig：`base.json`（Node/通用）、`react.json`（DOM + react-jsx）。子包通过 `"extends": "<%= scope %>/tsconfig/base.json"` 引用。

## 约定

- 包管理只用 **pnpm**，不要提交 npm/yarn 的 lock 文件以外的内容；`pnpm-lock.yaml` 应提交。
- 内部依赖一律用 `"workspace:*"` 版本声明。
- 新包命名：应用放 `apps/`（短名如 `web`、`api`），库放 `packages/` 并以 `<%= scope %>/` 为作用域。
- 代码风格：ESLint flat config（根 `eslint.config.js`，子包共享）+ Prettier（2 空格、LF）。未使用变量加 `_` 前缀豁免。
- TypeScript 严格模式（`strict` + `noUncheckedIndexedAccess`）；库包必须产出 d.ts。
- React 组件用函数组件 + TypeScript interface 描述 props。
- 不要改动 `turbo.json` 管道拓扑，除非同步更新根 `package.json` 脚本。

## 常用命令

```bash
pnpm install                      # 安装全部依赖
pnpm dev                          # 并行启动所有 dev 任务
pnpm build                        # 拓扑构建全部包（turbo 缓存）
pnpm lint / pnpm test             # 全仓库 lint / 测试
pnpm build --filter=web           # 只构建 web 及其内部依赖
pnpm --filter <%= scope %>/shared test   # 只跑 shared 的测试
pnpm format                       # Prettier 全量格式化
```

## 修改指引

- 改共享代码先确认影响面：`packages/shared` 被 web 和 api 同时依赖；`packages/ui` 被 web 依赖。
- 构建顺序由 Turborepo 依 `dependsOn: ["^build"]` 自动保证，手写脚本不要绕过。
- 新增环境变量时同步更新 `.gitignore` 检查，不要把 `.env` 提交进仓库。
