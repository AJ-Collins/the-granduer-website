# D'Grandeur Platform

> **Stack:** Next.js 14 · TypeScript · PostgreSQL · Prisma · Redis · MinIO · Tailwind CSS · Turborepo · pnpm · Docker

---

## Prerequisites

Make sure you have the following installed on your machine:

| Tool | Version | Install |
|---|---|---|
| Node.js | 20+ | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Docker | 24+ | https://www.docker.com |
| Docker Compose | v2 plugin | Included with Docker Desktop |
| Git | any | https://git-scm.com |

---

## 1. Clone the Repository

```bash
git clone https://github.com/thegranduer/the-granduer-website.git
cd the-granduer-website
```

---

## 2. Install Dependencies

```bash
pnpm install
```

This installs dependencies for all apps and packages across the monorepo via pnpm workspaces.

---

## 3. Set Up Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```bash
# Database
DATABASE_URL=postgresql://dgrandeur:password@localhost:5432/dgrandeur

# Redis
REDIS_URL=redis://localhost:6379

# Auth (generate with: openssl rand -base64 32)
AUTH_SECRET=your-32-char-secret-here

# MinIO (local object storage)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_PUBLIC_URL=http://localhost:9000

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_CMS_URL=http://localhost:3002
```

> **Note:** Each app (`apps/admin`, `apps/cms`, `apps/web`) also reads from the root `.env.local`. If you need per-app overrides, create `.env.local` inside the app directory.

---

## 4. Start Docker Services

This starts PostgreSQL, Redis, and MinIO locally:

```bash
docker compose -f infra/docker-compose.yml up -d
```

Verify all three services are running:

```bash
docker compose -f infra/docker-compose.yml ps
```

Expected output:

```
NAME         STATUS
postgres     running
redis        running
minio        running
```

### MinIO Console (optional)

You can access the MinIO web console at:

```
http://localhost:9001
```

Login with `minioadmin` / `minioadmin` (or whatever you set in your `.env.local`).

---

## 5. Set Up the Database

### Run Migrations

```bash
pnpm db:migrate
```

This runs Prisma migrations against your local PostgreSQL instance and creates all tables.

### Seed the Database

```bash
pnpm db:seed
```

This seeds:

- All permission strings (e.g. `users.create`, `content.publish`, etc.)
- `ADMIN` role with all permissions
- `MANAGER` role with CMS-level permissions
- A default admin user:
  - **Email:** `admin@dgrandeur.com`
  - **Password:** `Admin@123!`
- Default site settings (phone, email, WhatsApp, social links — all blank, edit via Admin UI)

> **Important:** Change the default admin password immediately after first login.

### Verify (optional)

Open Prisma Studio to browse your database:

```bash
pnpm db:studio
```

This opens a browser UI at `http://localhost:5555`.

---

## 6. Set Up MinIO Buckets

Run the bucket setup script to create the required storage buckets:

```bash
pnpm --filter @dgrandeur/storage exec tsx src/scripts/setup-buckets.ts
```

This creates three buckets with public-read policy:

| Bucket | Purpose |
|---|---|
| `dgrandeur-images` | Uploaded images |
| `dgrandeur-videos` | Uploaded videos |
| `dgrandeur-documents` | Uploaded PDFs / documents |

---

## 7. Start the Development Servers

Start all three apps simultaneously with Turborepo:

```bash
pnpm dev
```

Or start individual apps if you only need one:

```bash
# Public website only
pnpm --filter @dgrandeur/web dev

# Admin only
pnpm --filter @dgrandeur/admin dev

# CMS only
pnpm --filter @dgrandeur/cms dev
```

### App URLs

| App | URL | Who uses it |
|---|---|---|
| Public Website | http://localhost:3000 | Visitors/ Users |
| Admin | http://localhost:3001 | ADMIN role |
| CMS | http://localhost:3002 | MANAGER role |

---

## 8. First Login

### Admin App

1. Go to `http://localhost:3001/login`
2. Email: `admin@dgrandeur.com`
3. Password: `Admin@123!`
4. You will land on the Admin dashboard

### Creating a Manager User

1. Log in to the Admin app
2. Go to **Users → New User**
3. Fill in name, email, and set a password
4. Assign the `MANAGER` role
5. Save — the user can now log in to `http://localhost:3002`

---

## 9. Verify Everything Works

Run through this quick checklist:

- [ ] `http://localhost:3001/login` — Admin login works
- [ ] Admin can see Users and Roles pages
- [ ] `http://localhost:3002/login` — CMS login works with Manager account
- [ ] CMS dashboard loads without errors
- [ ] Upload a test image in CMS → it appears in MinIO at `http://localhost:9000`
- [ ] `http://localhost:3000` — Public website loads
- [ ] Submit a test enquiry form — check CMS `/enquiries` inbox

---

## 10. Useful Commands

```bash
# Install all dependencies
pnpm install

# Start all dev servers
pnpm dev

# Build all apps
pnpm build

# Run all lint checks
pnpm lint

# Run all unit + integration tests
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run E2E tests (Playwright)
pnpm exec playwright test

# Database: create and apply a new migration
pnpm db:migrate

# Database: apply existing migrations (no new migration created)
pnpm --filter @dgrandeur/db exec prisma migrate deploy

# Database: open Prisma Studio
pnpm db:studio

# Database: re-run seed
pnpm db:seed

# Database: reset (drop all data and re-seed) — DESTRUCTIVE
pnpm --filter @dgrandeur/db exec prisma migrate reset

# Start Docker services
docker compose -f infra/docker-compose.yml up -d

# Stop Docker services
docker compose -f infra/docker-compose.yml down

# Stop Docker services and remove volumes (wipes DB + MinIO) — DESTRUCTIVE
docker compose -f infra/docker-compose.yml down -v

# View Docker logs
docker compose -f infra/docker-compose.yml logs -f

# View logs for a single service
docker compose -f infra/docker-compose.yml logs -f postgres
```

---

## 11. Project Structure (Quick Reference)

```
dgrandeur/
├── apps/
│   ├── web/          # Public website (localhost:3000)
│   ├── admin/        # Admin app    (localhost:3001)
│   └── cms/          # CMS app      (localhost:3002)
│
├── packages/
│   ├── auth/         # Session, login, password — used by all apps
│   ├── authorization/# RBAC permission checks + Redis cache
│   ├── db/           # Prisma client + schema + migrations
│   ├── ui/           # Shared React components (Tailwind)
│   ├── storage/      # MinIO client + presigned URL helpers
│   ├── cache/        # Redis client singleton
│   ├── email/        # Transactional email helpers
│   └── validators/   # Shared Zod schemas
│
├── infra/
│   ├── docker-compose.yml        # Local dev services
│   ├── docker-compose.prod.yml   # Production services
│   └── nginx/nginx.conf          # Nginx subdomain config
│
├── .github/workflows/
│   ├── ci.yml        # Lint + test on every push
│   └── deploy.yml    # Build images + SSH deploy on main
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 12. Troubleshooting

### Port already in use

```bash
# Find what is using port 5432 (postgres)
lsof -i :5432

# Kill the process
kill -9 <PID>
```

### Prisma client out of sync

If you get Prisma type errors after pulling new changes:

```bash
pnpm --filter @dgrandeur/db exec prisma generate
```

### Cannot connect to database

Check Docker is running and the postgres container is healthy:

```bash
docker compose -f infra/docker-compose.yml ps
docker compose -f infra/docker-compose.yml logs postgres
```

### MinIO upload failing

Check that buckets exist:

```bash
docker compose -f infra/docker-compose.yml logs minio
```

Then re-run the bucket setup:

```bash
pnpm --filter @dgrandeur/storage exec tsx src/scripts/setup-buckets.ts
```

### Redis connection refused

```bash
docker compose -f infra/docker-compose.yml logs redis
```

If the container is not running:

```bash
docker compose -f infra/docker-compose.yml up -d redis
```

### pnpm workspace package not found

Run `pnpm install` from the root again — this re-links all workspace packages:

```bash
pnpm install
```

---

## 13. Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `REDIS_URL` | ✅ | Redis connection string |
| `AUTH_SECRET` | ✅ | JWT signing secret — minimum 32 chars |
| `MINIO_ENDPOINT` | ✅ | MinIO host (e.g. `localhost` or `minio` in Docker) |
| `MINIO_PORT` | ✅ | MinIO API port (default `9000`) |
| `MINIO_USE_SSL` | ✅ | `true` or `false` |
| `MINIO_ACCESS_KEY` | ✅ | MinIO root user / access key |
| `MINIO_SECRET_KEY` | ✅ | MinIO root password / secret key |
| `MINIO_PUBLIC_URL` | ✅ | Public base URL for serving assets |
| `NEXT_PUBLIC_APP_URL` | optional | Public website base URL |
| `NEXT_PUBLIC_ADMIN_URL` | optional | Admin app base URL |
| `NEXT_PUBLIC_CMS_URL` | optional | CMS app base URL |

---

## 14. Default Credentials (Change Immediately)

| Service | Username | Password |
|---|---|---|
| Admin app | `admin@dgrandeur.com` | `Admin@123!` |
| MinIO console | `minioadmin` | `minioadmin` |
| PostgreSQL | `dgrandeur` | set in `.env.local` |

---

*For deployment instructions, CI/CD setup, Nginx config, and SSL certificates — see the full engineering docs in Notion.*