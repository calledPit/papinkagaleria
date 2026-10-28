import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryKeys } from './config/site';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      /** Kode produk seperti di price list, misal "MUG 001". */
      code: z.string(),
      name: z.string(),
      category: z.enum(categoryKeys),
      /** Kapasitas dalam ml. Kosongkan jika belum diketahui. */
      capacityMl: z.number().int().positive().optional(),
      /** Harga dalam Rupiah, tanpa titik. Kosongkan jika harga by request (tampil "Tanya harga"). */
      price: z.number().int().positive().optional(),
      /** Keunggulan utama, label pertama tampil di panel. Misal "Include grafir". */
      badges: z.array(z.string()).default([]),
      image: image(),
      imageAlt: z.string(),
      /** Versi bahasa Inggris (deskripsi bahasa Indonesia ada di isi file). */
      en: z.object({
        name: z.string(),
        imageAlt: z.string(),
        description: z.string(),
      }),
      /** Urutan tampil (kecil = lebih dulu). */
      order: z.number().int(),
    }),
});

/**
 * Artikel blog. Satu file per bahasa: src/content/blog/id/*.md dan src/content/blog/en/*.md.
 * Artikel yang sama dalam dua bahasa dihubungkan lewat `key` yang sama.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(['id', 'en']),
      /** Alamat artikel, misal "ide-souvenir-kantor" → /blog/ide-souvenir-kantor/ */
      slug: z.string(),
      /** Penghubung versi ID & EN dari artikel yang sama. */
      key: z.string(),
      title: z.string(),
      /** Ringkasan 1–2 kalimat; dipakai di daftar artikel dan meta description. */
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string(),
      /** Produk yang ditampilkan di akhir artikel (nama file produk tanpa .md). */
      products: z.array(reference('products')).default([]),
    }),
});

/** Halaman area layanan untuk SEO lokal, misal /souvenir-custom-palembang/ (bahasa Indonesia). */
const area = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/area' }),
  schema: ({ image }) =>
    z.object({
      /** Alamat halaman, misal "souvenir-custom-palembang". */
      slug: z.string(),
      /** Nama area untuk tautan dan data terstruktur, misal "Palembang". */
      area: z.string(),
      areaType: z.enum(['City', 'State']),
      title: z.string(),
      description: z.string(),
      headline: z.tuple([z.string(), z.string()]),
      cover: image(),
      coverAlt: z.string(),
      products: z.array(reference('products')).default([]),
      order: z.number().int(),
    }),
});

export const collections = { products, blog, area };
