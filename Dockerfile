FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install --only=production

CMD npx prisma migrate reset && npx prisma migrate deploy --schema=prisma/schema.prisma && node src/server.js
