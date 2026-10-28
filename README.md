# Papinka Galeria

Website katalog mug & tumbler custom untuk [papinkagaleria.com](https://papinkagaleria.com), dibangun dengan [Astro](https://astro.build) dan di-deploy ke Cloudflare.

## Perintah

| Perintah          | Fungsi                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependency                              |
| `npm run dev`     | Jalankan server lokal di `localhost:4321`       |
| `npm run build`   | Build website ke folder `dist/`                 |
| `npm run preview` | Lihat hasil build secara lokal                  |
| `npx astro check` | Cek error TypeScript dan data produk            |

## Mengubah nomor & pesan WhatsApp

Semua pengaturan ada di [`src/config/site.ts`](src/config/site.ts), bagian `whatsapp`:

- `number`: nomor WhatsApp format internasional tanpa `+`, contoh `6281234567890`.
- `label`: teks tombol pesan.
- `generalMessage`: isi chat dari tombol WhatsApp umum (header, beranda, tombol melayang).
- `productMessage`: isi chat dari halaman produk. Placeholder yang bisa dipakai:
  `{code}`, `{name}`, `{capacity}`, `{price}`, `{url}`.

## Menambah atau mengubah produk

Setiap produk adalah satu file di [`src/content/products/`](src/content/products/). Nama file menjadi URL,
misalnya `mug-001.md` → `/produk/mug/mug-001/`.

```md
---
code: 'MUG 001'
name: 'Mug Tutup Custom Logo'
category: mug            # mug atau tumbler
capacityMl: 350          # boleh dihapus jika belum diketahui
price: 30000             # Rupiah, tanpa titik
order: 1                 # urutan tampil
badges: ['Include grafir']
image: ../../assets/products/mug-001.jpg
imageAlt: 'Deskripsi foto untuk SEO dan aksesibilitas'
---

Deskripsi produk. Teks ini tampil di halaman produk dan dipakai untuk SEO.
```

Foto produk disimpan di [`src/assets/products/`](src/assets/products/). Astro otomatis mengompres
dan mengubahnya ke WebP saat build.

## Deploy ke Cloudflare

Website ini statis (folder `dist/`), dikonfigurasi lewat [`wrangler.jsonc`](wrangler.jsonc).

1. Push repo ke GitHub.
2. Di dashboard Cloudflare: **Workers & Pages → Create → Import a repository**, pilih repo ini.
3. Build command: `npm run build`, deploy command: `npx wrangler deploy`.
4. Setelah deploy, tambahkan custom domain `papinkagaleria.com` di pengaturan proyek.
