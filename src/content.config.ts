import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      /** Kode produk seperti di price list, misal "MUG 001". */
      code: z.string(),
      name: z.string(),
      category: z.enum(['mug', 'tumbler']),
      /** Kapasitas dalam ml. Kosongkan jika belum diketahui. */
      capacityMl: z.number().int().positive().optional(),
      /** Harga dalam Rupiah, tanpa titik. */
      price: z.number().int().positive(),
      /** Catatan singkat yang tampil sebagai label, misal "Include grafir". */
      badges: z.array(z.string()).default([]),
      image: image(),
      imageAlt: z.string(),
      /** Urutan tampil (kecil = lebih dulu). */
      order: z.number().int(),
    }),
});

export const collections = { products };
