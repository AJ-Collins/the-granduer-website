# Backend architecture — single Next.js app, colocated server domains

Supersedes the old monorepo (`apps/*` + `packages/*`) layout. One deployment,
file-system routing, no app object to build:

```
request → src/proxy.ts (subdomain gateway + session guard, edge)
        → src/app/api/<...>/route.ts (one-line delegate)
        → src/server/<domain>/controllers/<action>.ts (rate-limit → service → envelope)
        → src/server/<domain>/services/*.ts (Prisma / storage / mail)
```

## Rules

1. `src/app/api/**/route.ts` holds NO logic — parse/guard lives in controllers + hosts.
2. One file = one function/type in `src/server/**`.
3. `services/` is HTTP-free (no `Request`/`Response`, no cookies, no `next/headers`).
4. Controllers return the `{ success, data | error }` envelope, never throw domain errors
   unhandled — typed errors (`*.status`) map to `fail(...)`.
5. No cross-domain imports of internals: controllers compose services; shared layers
   (`http`, `hosts`, `access`, `rate-limit`, `db`) hold the cross-cutting code.
6. Bytes never touch Postgres (storage port + drivers); sessions are HttpOnly cookies;
   auth surfaces stay per-host (`/login` on each) because localhost cookies can't cross
   subdomains.

## What lives where

| Concern | Location |
|---|---|
| Host → surface dispatch, API session guard | `src/proxy.ts` + `src/server/hosts/` |
| Thin route delegates | `src/app/api/` |
| Authn/z, users, catalog, enquiries, cms, storage, admin | `src/server/<domain>/{controllers,requests,services}/` |
| Envelope, pagination, body parsing, public-route table | `src/server/http/` |
| Permission table + enforcement | `src/server/access/` |
| Named rate limiters + stores | `src/server/rate-limit/` |
| Prisma schema/migrations/seed + singleton client | `prisma/` + `src/server/db/client.ts` |
| Frontend domain UI | `src/domains/` |
| Design system, DTOs, Zod schemas | `src/shared/` |
| Tests (mirror `src`, none beside source) | `tests/unit/` |

## Rollout from here

1. ✅ Flatten: single app, cookie sessions, catalog + enquiries + users + audit + uploads.
2. CMS studio pages: wire the stub pages to the CMS APIs (content, packages, events, faqs, testimonials, enquiries).
3. Admin console pages: wire dashboard stats, users, roles to the admin APIs.
4. Storefront data: replace static `*-content.ts` reads with the public APIs where live data matters (packages, events, FAQs, testimonials, gallery).
5. E2E: Playwright spec for login → publish → public-read.
