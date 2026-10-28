# Papinka Galeria

Website katalog souvenir custom (mug, tumbler, totebag, kerajinan, pembatas buku) untuk [papinkagaleria.com](https://papinkagaleria.com), dibangun dengan [Astro](https://astro.build) dan di-deploy ke Cloudflare.

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
- `messages.id` / `messages.en`: isi chat per bahasa. `general` untuk tombol WhatsApp umum, `product` untuk
  tombol di produk dengan placeholder `{code}`, `{name}`, `{capacity}`, `{price}`, `{url}`.

## Menambah atau mengubah produk

Setiap produk adalah satu file di [`src/content/products/`](src/content/products/). Nama file menjadi URL,
misalnya `mug-001.md` → `/produk/mug/mug-001/`.

```md
---
code: 'MUG 001'
name: 'Mug Tutup Custom Logo'
category: mug            # mug, tumbler, totebag, kerajinan, atau buku
capacityMl: 350          # boleh dihapus jika belum diketahui
price: 30000             # Rupiah tanpa titik; hapus baris ini untuk "Tanya harga"
order: 1                 # urutan tampil
badges: ['Include grafir']
image: ../../assets/products/mug-001.jpg
imageAlt: 'Deskripsi foto untuk SEO dan aksesibilitas'
en:                      # versi bahasa Inggris (wajib)
  name: 'Lidded Custom Logo Mug'
  imageAlt: 'Photo description in English'
  description: 'Product description in English.'
---

Deskripsi produk (bahasa Indonesia). Teks ini tampil di halaman produk dan dipakai untuk SEO.
```

Kategori baru (misalnya buku agenda) ditambahkan di `categoryKeys` pada [`src/config/site.ts`](src/config/site.ts)
dan nama/alamatnya per bahasa di `categoryInfo` pada [`src/i18n/index.ts`](src/i18n/index.ts).

## Menulis artikel blog

Artikel ada di [`src/content/blog/id/`](src/content/blog/id/) (Indonesia) dan
[`src/content/blog/en/`](src/content/blog/en/) (Inggris). Versi dua bahasa dari artikel yang sama
dihubungkan lewat `key` yang sama.

```md
---
lang: id                      # id atau en
slug: ide-hampers-lebaran     # alamat: /blog/ide-hampers-lebaran/
key: hampers-lebaran          # sama dengan versi bahasa Inggris
title: "Judul artikel (idealnya di bawah 60 karakter)"
description: "Ringkasan 1–2 kalimat, tampil di Google."
date: 2026-11-01
cover: ../../../assets/products/rantang-bambu.jpg
coverAlt: "Deskripsi gambar sampul"
products:                     # produk yang tampil di akhir artikel (nama file produk)
  - rantang-bambu
---

Isi artikel. Gunakan ## untuk subjudul, - untuk daftar, **tebal** untuk penekanan.
```

## Dua bahasa

- Bahasa Indonesia di alamat utama (`/produk/...`), bahasa Inggris di `/en/` (`/en/products/...`).
- Semua teks antarmuka ada di [`src/i18n/index.ts`](src/i18n/index.ts); template pesan WhatsApp per bahasa
  ada di [`src/config/site.ts`](src/config/site.ts).
- Setiap halaman otomatis punya `hreflang` (id, en, x-default) dan tombol ganti bahasa ID/EN.

Foto produk disimpan di [`src/assets/products/`](src/assets/products/). Astro otomatis mengompres
dan mengubahnya ke WebP saat build.

## Deploy ke Cloudflare

Website ini statis (folder `dist/`), dikonfigurasi lewat [`wrangler.jsonc`](wrangler.jsonc).

1. Push repo ke GitHub.
2. Di dashboard Cloudflare: **Workers & Pages → Create → Import a repository**, pilih repo ini.
3. Build command: `npm run build`, deploy command: `npx wrangler deploy`.
4. Setelah deploy, tambahkan custom domain `papinkagaleria.com` di pengaturan proyek.
