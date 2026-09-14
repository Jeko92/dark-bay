# syntax=docker/dockerfile:1

# Two-stage build: compile in a full toolchain image, run from the same
# base without the native-module build tools. node_modules — including
# devDependencies — carries over to the runtime stage on purpose: the
# CMD below runs `npm run migration:run` before starting the app, and
# that script (typeorm-ts-node-commonjs) needs ts-node/typescript at
# container start, not just at build time. See src/app.module.ts for why
# migrations aren't loaded through the compiled app instead.
#
# Build with (run from the repo root):
#   docker build -t dark-bay .

# Stage 1: build
FROM node:22-alpine AS builder

# better-sqlite3 compiles its native addon from source on Alpine's musl
# libc — node-gyp needs these.
RUN apk add --no-cache python3 make g++

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

# better-sqlite3 writes DB_FILE here. Render's filesystem is ephemeral
# unless a persistent disk is mounted at this path — without one, the
# database resets on every deploy and every restart.
RUN mkdir -p data && chown node:node data

EXPOSE 3030
ENV PORT=3030
USER node

# Apply pending migrations, then start the compiled app.
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]
