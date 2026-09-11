# <%= projectName %>

> <%= description %>

基于 **pnpm workspace + Turborepo** 的全栈 TypeScript Monorepo 模板。

## 技术栈

- 包管理与编排：pnpm workspace、Turborepo（构建缓存与任务管道）
- 前端：Vite + React 18 + TypeScript
- 后端：Node.js + Express + TypeScript（tsx 开发热更新）
- 共享包：tsup 构建（ESM + CJS + d.ts 三产物）
- 代码规范：ESLint 9（flat config）+ Prettier

## 目录结构

```
<%= projectName %>/
├── apps/
│   ├── web/                # Vite + React 前端应用（开发端口 5173，/api 代理到 3001）
│   └── api/                # Express 轻量 HTTP 服务（端口固定 3001）
├── packages/
│   ├── ui/                 # React 共享组件库（tsup 构建）
│   ├── shared/             # 共享工具函数与类型定义
│   └── tsconfig/           # 共享 tsconfig 基座（base.json / react.json）
├── package.json            # 根包（private，统一脚本入口）
├── pnpm-workspace.yaml     # workspace 声明
├── turbo.json              # Turborepo 任务管道：build / lint / test / dev
├── eslint.config.js        # 根 ESLint flat config，子包共用
└── .npmrc                  # pnpm 行为配置
```

内部包均以 `<%= scope %>` 为作用域命名，例如 `<%= scope %>/ui`、`<%= scope %>/shared`、`<%= scope %>/tsconfig`，
workspace 内通过 `"<%= scope %>/ui": "workspace:*"` 方式互相引用。

## 快速开始

使用 AgileBuilder CLI 从模板生成项目：

```bash
ag create --git-url <仓库地址> --target <目录>
```

生成后进入项目目录：

```bash
cd <目录>
pnpm install
pnpm dev        # 并行启动 web (5173) 与 api (3001)
```

浏览器访问 http://localhost:5173 ，页面会通过 Vite 代理调用 `http://localhost:3001/api/hello`。

## 模板变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `projectName` | 项目名称（根 package.json 的 name） | `demo-monorepo` |
| `scope` | 内部包 npm 作用域，内部包名形如 `<%= scope %>/ui` | `@demo` |
| `description` | 项目描述 | `一个全栈 Monorepo` |
| `author` | 作者 | （空） |

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | Turborepo 并行启动所有包的 dev 任务 |
| `pnpm build` | Turborepo 按依赖拓扑构建全部包（含缓存） |
| `pnpm lint` | 所有包执行 ESLint |
| `pnpm test` | 执行单元测试（packages/shared 使用 Vitest） |
| `pnpm format` | Prettier 格式化全仓库 |
| `pnpm clean` | 清理构建产物与 node_modules |

单包命令可用 Turborepo 过滤，例如：`pnpm build --filter=web`、`pnpm dev --filter=api`。

## API 说明

`apps/api` 内置两个端点（端口固定 3001）：

- `GET /health`：健康检查，返回 `{ status, uptime }`
- `GET /api/hello?name=xxx`：返回由 `<%= scope %>/shared` 生成的问候语

## License

MIT
