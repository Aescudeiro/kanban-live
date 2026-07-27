# @kanban-live/api

NestJS backend for [kanban-live](../../README.md): REST endpoints and the
real-time WebSocket gateway that broadcasts board changes to connected clients.

```bash
pnpm dev        # start in watch mode
pnpm test       # unit tests (Vitest)
pnpm test:e2e   # end-to-end tests (Vitest + supertest)
```

Shared domain types and event contracts come from
[`@kanban-live/shared`](../../packages/shared).
