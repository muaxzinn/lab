# ==============================================================================
# Interactive Learning Platform - Production Dockerfile (Next.js 15 Standalone)
# Optimized for Windows (Docker Desktop / WSL2), macOS, and Linux
# ==============================================================================

# Stage 1: Base Alpine image with Node.js and Corepack
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm via corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy dependency manifests
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies required for build)
RUN pnpm install --frozen-lockfile || pnpm install

# Stage 3: Build the Next.js standalone application
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Next.js standalone build
RUN pnpm build

# Stage 4: Production runner image (ultra-lean ~150MB)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# CRITICAL for Windows Docker Desktop: 0.0.0.0 enables port forwarding to host
ENV HOSTNAME="0.0.0.0"

# Create unprivileged system user and group for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
