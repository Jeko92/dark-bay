# syntax=docker/dockerfile:1

# Two-stage build: compile in a full toolchain image, run from a lean base.
# node_modules — including devDependencies — still carries over to the
# runtime stage on purpose: the CMD below runs `npm run migration:run`
# before starting the app, and that script (typeorm-ts-node-commonjs)
# needs ts-node/typescript at container start, not just at build time.
# See src/app.module.ts for why migrations aren't loaded through the
# compiled app instead.
#
# Build with (run from the repo root):
#   docker build -t dark-bay .

# Stage 1: build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json

EXPOSE 3030
ENV PORT=3030
USER node

# Apply pending migrations, then start the compiled app. Postgres
# connection comes from DATABASE_URL (+ optional DATABASE_SSL) — see
# src/db/data-source.ts.
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]
