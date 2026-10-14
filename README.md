# D'Grandeur — one Next.js deployment, three surfaces, one shared API

> **Stack:** Next.js 16 · React 19 · TypeScript · PostgreSQL · Prisma 7 · Redis · Tailwind CSS 4 · pnpm · Docker (postgres + redis only)

One Next.js deployment serves 3 surfaces + 1 shared API, picked by hostname at the edge
(`src/proxy.ts` — called "Proxy" in Next 16, same job as the old Middleware).

| Host (dev) | Surface | What |
|---|---|---|
| `localhost:3000` | web | Storefront |
| `admin.localhost:3000` | admin | Console (`/dashboard`, `/users`, `/roles`) + `/login` |
| `cms.localhost:3000` | cms | Studio (`/dashboard`, `/content`, `/packages`, `/events`, `/enquiries`, …) + `/login` |

> Add `127.0.0.1 admin.localhost cms.localhost` to `/etc/hosts` for local subdomain dev.
> In production set `APEX_DOMAIN` (plus `ADMIN_HOST` / `CMS_HOST` / `WEB_HOSTS` to override).

## Quickstart

```bash
cp .env.example .env
docker compose up -d            # postgres :5433, redis :6379
pnpm install
pnpm db:migrate                 # prisma migrate dev
pnpm db:seed                    # roles + admin + catalog + faqs
pnpm dev                        # next dev :3000
```

Seeded admin: `admin@dgrandeur.com` (set `SeedAdmin123!change` when seeding).

## Structure

```
src/
├── proxy.ts                   # subdomain gateway + API session guard (edge)
├── app/
│   ├── (web)/                 # storefront pages
│   ├── (admin)/admin/         # console: dashboard, users, roles + login
│   ├── (cms)/cms/             # studio: content, catalog, enquiries + login
│   └── api/.../route.ts       # thin delegates — NO logic, one controller call each
├── server/<domain>/           # backend, colocated per domain
│   ├── controllers/<action>.ts  # one exported action: rate-limit → service → envelope
│   ├── requests/<read-...>.ts   # one validated Zod reader each
│   └── services/<thing>.ts      # one function/type/error each (pure logic, HTTP-free)
├── server/{http,hosts,access,rate-limit,db}/  # shared backend layers
├── domains/                   # frontend per-domain UI (one export each)
├── shared/{components,lib,schemas}/           # cross-cutting UI, DTOs, Zod schemas
prisma/{schema.prisma,migrations/,seed.ts}
tests/unit/**                  # mirrors src — no tests beside source
```

Rule enforced everywhere: **one file = one function/type.**

## Responses

Every JSON endpoint uses one envelope:

```jsonc
// success
{ "success": true, "data": {}, "meta": { "page": 1, "pageSize": 20, "total": 3, "totalPages": 1 } }
// failure
{ "success": false, "error": { "code": "RATE_LIMITED", "message": "Too many requests", "retryAfterSeconds": 900 } }
```

## Auth

- Passwords: bcrypt-12. Sessions: 15-min access JWT + opaque 256-bit refresh (30-day sliding window, rotation, reuse detection revokes all sessions).
- HttpOnly cookies (`dgrandeur_session`, `dgrandeur_refresh`); SameSite=lax; Secure in prod. Nothing in localStorage.
- Password reset: hash-only single-use tokens, max 5 live per user per 24h, anti-enumeration responses.
- RBAC: one table in `src/server/access/permissions.ts`, enforced at edge (session presence) → controller (`requireUser` → `requirePermission`) → layout (role redirect).

## Rate limiting

Named limiters in `src/server/rate-limit/limiters.ts` (Redis Lua when `REDIS_URL` is set, memory otherwise, fail-open). Identity buckets sit beside IP budgets; refresh is split from login; preflights exempt. 429s use the failure envelope + `Retry-After`.

## Storage

Port `ObjectStorage{put,get,delete,exists}` + local (disk, `/api/files/<key>`) / minio (S3) drivers via `STORAGE_DRIVER`. Bytes never touch Postgres — only `{key,url}` rows in `FileAsset`.

## Notifications (outbox)

Mail is never sent in the request path. Services enqueue a `NotificationOutbox` row in the
same transaction as the domain write; an in-process poller (`src/instrumentation.ts`,
every 10s, `SKIP LOCKED` — safe with N instances) dispatches due rows via `sendMail`
(logged, not sent, when SMTP is unset).

- Max **3 attempts**, exponential backoff (2/4/8 min), then `FAILED` (dead-letter).
- Admin controls: `GET /api/admin/outbox` (filters `status`, `type`), `GET /:id`,
  `PATCH /:id {"action":"retry"}` (FAILED-only, audited as `admin.outbox-retried`).

## Idempotency (shared kernel)

Retrying a request never repeats its effect. `src/server/idempotency/` owns key
reservation, request fingerprints, and result storage; each context decides what
a duplicate means and recovers inside its own transaction.

- Clients send `Idempotency-Key` (required on `POST /api/enquiry`, `[A-Za-z0-9_-]{1,128}`).
- The key binds to one exact request (method + path + actor + body hash).
  Same key + same payload replays the stored response; same key + different
  payload → `409 IDEMPOTENCY_CONFLICT`; a live identical attempt → `409
  IDEMPOTENCY_IN_PROGRESS` with `Retry-After`.
- Keys are scoped per actor (`scope, actor, key` unique), so one user can never
  read or collide with another's result.
- The business write and the result-store share one transaction, so a timeout
  after commit still replays instead of duplicating. Crashed attempts recover
  after a 5-minute lease (single winner via conditional refresh); failed keys
  accept same-payload retries.
- Covered in `tests/integration/idempotency.test.ts`: replay, conflict, 10-way
  concurrency race, crash recovery race, failed retry, cross-actor isolation,
  and a double-POST that yields one enquiry + one queued mail.

## Tests

```bash
pnpm test        # vitest → tests/unit/**
pnpm exec tsc --noEmit
```
