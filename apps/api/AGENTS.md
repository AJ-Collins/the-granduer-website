# apps/api — boundary quick reference

- `core/` — technical only. No imports from `contexts/` or `shared/`.
- `contexts/<ctx>/<feature>/index.ts` — the only legal import point for other features.
- `domain/` — pure. Allowed: `shared-kernel`, `contracts` types. Forbidden: `hono`,
  `@dgrandeur/db`, `@dgrandeur/storage`, `@dgrandeur/cache`, Next.js.
- `application/` — allowed: `domain/`, `shared/*` ports, `contracts`. Forbidden: HTTP, Prisma impl.
- `infrastructure/` — the ONLY layer that imports `@dgrandeur/db`, `@dgrandeur/storage`, etc.
- `presentation/` — the ONLY layer that imports `hono`. Validates with zod, calls use-case, responds.
- `bootstrap/` — the ONLY place that constructs repositories/adapters.
- `packages/contracts` — DTOs both frontend and backend use. No logic.
