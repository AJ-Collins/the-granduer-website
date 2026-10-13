# Backend architecture — context-grouped modular monolith

One backend deployment (`apps/api`), organized by **application/business context**
first, then feature, then responsibility.

```
apps/api/src/
├── core/            # HTTP, errors, config, logging, middleware (no business logic)
├── contexts/
│   ├── public/      # Unauthenticated visitor workflows (reads published data, submits enquiries)
│   ├── cms/         # Content publishing workflows (protected)
│   ├── admin/       # Platform administration workflows (protected)
│   └── identity/    # Shared login/sessions/passwords — the ONLY session system
├── shared/          # App-level services: health, pagination, notifications, media
└── bootstrap/       # Composition root: dependencies.ts + app wiring
```

Inside each feature (`contexts/<ctx>/<feature>/`):

```
domain/          # entities, value-objects, rules, errors, repository INTERFACES (no I/O)
application/     # use-cases (one business op), dto, ports (outbound interfaces)
infrastructure/  # repository implementations (Prisma), mappers
presentation/    # routes, controllers, schemas (HTTP only)
<feature>.module.ts  # wires routes
index.ts         # PUBLIC boundary — other features import only from here
```

## Rules (enforced by review; lint rules to follow)

1. Import across features only via `index.ts`, never deep into another feature.
2. `domain/` + `application/` never import HTTP frameworks, Prisma, MinIO, Next.js.
3. Controllers validate + call one use-case + map to HTTP. No business rules, no SQL.
4. Use-cases never touch `c.json`/Prisma directly — only via repository/port interfaces.
5. `packages/*` never import from `apps/api`.
6. `admin/`, `cms/`, `public/` never implement their own auth/sessions/passwords —
   they reuse `identity/` + `packages/auth`.
7. Shared catalog/content logic lives in ONE domain module; `cms/` publishes,
   `public/` reads. No duplicated repositories.

## What lives where

| Concern | Location |
|---|---|
| Routes, controllers, middleware | `apps/api` |
| Use-cases, domain rules | `apps/api/src/contexts/*` |
| Prisma schema, migrations, client | `packages/db` |
| Password/session primitives | `packages/auth` |
| Permission definitions/helpers | `packages/authorization` |
| MinIO adapter | `packages/storage` |
| Redis adapter | `packages/cache` |
| Email provider | `packages/email` + queue in `packages/queues`, run in `apps/worker` |
| API DTOs shared frontend↔backend | `packages/contracts` |
| Reusable validation primitives | `packages/validators` (business rules stay in domains) |

## Rollout order

1. ✅ Foundation (this change): HTTP server, env, errors, request-id, health, module wiring.
2. Shared infra: real Prisma models, Redis/session, MinIO buckets, SMTP.
3. Identity: login/sessions/password-reset, real `authenticate` + permission enforcement.
4. Catalog/content reads (public) + publishing (cms).
5. Enquiries persistence (Prisma swap) + notifications via worker.
6. Thin the Next.js `app/api/*` stubs into proxies or delete in favor of `apps/api`.
