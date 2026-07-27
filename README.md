# kanban-live

[![CI](https://github.com/Aescudeiro/kanban-live/actions/workflows/ci.yml/badge.svg)](https://github.com/Aescudeiro/kanban-live/actions/workflows/ci.yml)

A real-time collaborative Kanban board. Move a card on one screen and it moves
on everyone else's, instantly. Built as a portfolio project to demonstrate a
production-grade TypeScript monorepo, real-time architecture, and engineering
discipline (strict types, linting, formatting, and pre-commit gates).

## Stack

- **Backend** — [NestJS](https://nestjs.com/) (`apps/api`)
- **Frontend** — [React](https://react.dev/) + [Vite](https://vite.dev/) (`apps/web`)
- **Shared** — domain types & real-time event contracts (`packages/shared`)
- **Tooling** — pnpm workspaces, TypeScript (full strict), ESLint, Prettier,
  Husky + lint-staged, Commitlint (Conventional Commits), Vitest

## Repository layout

```
kanban-live/
├── apps/
│   ├── api/            # NestJS backend
│   └── web/            # React + Vite frontend
├── packages/
│   └── shared/         # @kanban-live/shared — types + websocket event contracts
├── tsconfig.base.json  # shared strict compiler options (each package extends it)
└── eslint.config.base.mjs
```

## Requirements

- Node `22` (see `.nvmrc`)
- pnpm `11+`
- Docker (for the local PostgreSQL database)

## Getting started

```bash
pnpm install                     # install every workspace
cp apps/api/.env.example apps/api/.env  # api config (DATABASE_URL)
pnpm db:up                       # start PostgreSQL in Docker
pnpm db:migrate                  # apply Drizzle migrations
pnpm dev                         # run all apps in parallel (api + web)
```

## Database

PostgreSQL runs in Docker (`docker-compose.yml`); the API talks to it through
[Drizzle ORM](https://orm.drizzle.team/) with versioned SQL migrations.

| Script                   | What it does                             |
| ------------------------ | ---------------------------------------- |
| `pnpm db:up` / `db:down` | Start / stop the Postgres container      |
| `pnpm db:migrate`        | Apply pending migrations                 |
| `api db:generate`        | Generate a migration from schema changes |
| `api db:studio`          | Open Drizzle Studio                      |

Schema lives in `apps/api/src/db/schema.ts`; generated migrations in
`apps/api/drizzle/` are committed. `api <script>` means run it from `apps/api`
(or `pnpm --filter @kanban-live/api <script>`).

## Scripts (run from the repo root)

| Script           | What it does                             |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Run every app in watch mode, in parallel |
| `pnpm build`     | Build all packages in topological order  |
| `pnpm test`      | Run tests across the workspace           |
| `pnpm typecheck` | Type-check every package                 |
| `pnpm lint`      | Lint every package                       |
| `pnpm format`    | Format the whole repo with Prettier      |

## Conventions

- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `chore:` …), enforced by Commitlint.
- **Pre-commit** runs ESLint + Prettier on staged files and type-checks the
  workspace via Husky + lint-staged.

## License

[MIT](./LICENSE) © Afonso Escudeiro
