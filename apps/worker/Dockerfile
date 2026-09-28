FROM node:20-slim

RUN npm install -g pnpm@10.32.1

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY apps/worker ./apps/worker
COPY packages ./packages

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "--filter", "@dgrandeur/worker", "start"]
