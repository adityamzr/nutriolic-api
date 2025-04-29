# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client (agar siap dipakai di production)
RUN npx prisma generate

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy hanya hasil build dari builder
COPY --from=builder /app /app

# Install hanya production dependencies
RUN npm install --only=production

# Jalankan migrasi saat container start (opsional tapi umum digunakan)
RUN npx prisma migrate deploy && node src/server.js
