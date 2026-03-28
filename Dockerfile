# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

COPY . .

# Build args let CI/CD pass values at build time; env vars
# passed at runtime via docker-compose override them.
ARG NUXT_PUBLIC_SITE_URL=https://dh-agentur.de
ARG NUXT_PUBLIC_BACKEND_URL=""
ARG IS_BACKEND=true

ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_BACKEND_URL=$NUXT_PUBLIC_BACKEND_URL
ENV IS_BACKEND=$IS_BACKEND

RUN npm run build

# ─── Stage 2: Production runtime ──────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
