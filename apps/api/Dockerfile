FROM node:22-slim
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json tsconfig.json ./
COPY apps/api/package.json apps/api/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter @dgrandeur/api...
COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN pnpm build
EXPOSE 4000
CMD ["node", "dist/server.js"]
