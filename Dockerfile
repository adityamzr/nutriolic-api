# Gunakan image resmi Bun
FROM oven/bun:1.1

# Set direktori kerja di container
WORKDIR /app

# Salin semua file ke container
COPY . .

# Install semua dependencies
RUN bun install
RUN bunx prisma generate

# Buka port 3000 (sesuaikan jika kamu pakai port lain)
EXPOSE 3000

# Jalankan aplikasi (ubah ke file utama kamu jika bukan index.ts atau app.ts)
CMD ["bun", "run", "start"]
