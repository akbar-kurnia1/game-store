# FreeStation

Website katalog game free-to-play yang mengambil data dari [FreeToGame API](https://www.freetogame.com/api-doc). Dibuat menggunakan React + Vite.

## Fitur

- **Hero Slider** — Menampilkan game unggulan secara bergantian di halaman utama.
- **Browse & Filter** — Jelajahi katalog game dan filter berdasarkan genre.
- **Pencarian** — Cari game berdasarkan judul.
- **Detail Game** — Lihat informasi lengkap setiap game (screenshot, deskripsi, spesifikasi, dsb).
- **Wishlist** — Simpan game yang diminati ke daftar wishlist.
- **Library** — Tambahkan game ke koleksi pribadi.
- **Community Hub** — Halaman komunitas.
- **Pagination** — Navigasi halaman untuk katalog game.
- **Responsive** — Tampilan menyesuaikan ukuran layar (mobile & desktop).

## Tech Stack

- [React 19](https://react.dev/) — UI Library
- [Vite 8](https://vite.dev/) — Build tool & dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [React Router 7](https://reactrouter.com/) — Client-side routing
- [FreeToGame API](https://www.freetogame.com/api-doc) — Sumber data game

## Struktur Folder

```
src/
├── components/
├── hooks/
├── pages/
├── assets/
├── App.jsx
└── main.jsx
```

## Cara Menjalankan

1. Clone repository:
   ```bash
   git clone https://github.com/akbar-kurnia1/game-store.git
   cd game-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env` berdasarkan `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka `http://localhost:5173` di browser.
