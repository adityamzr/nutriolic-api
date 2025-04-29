# Gunakan image Bun
FROM oven/bun:1.1

# Set direktori kerja
WORKDIR /app

# Salin package.json, bun.lockb, prisma/schema.prisma dulu
COPY package.json bun.lockb prisma ./ 

# Install dependencies lebih awal
RUN bun install

# Jalankan prisma generate
RUN bunx prisma generate

# Salin semua sisa file
COPY . .

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "start"]
