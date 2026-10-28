import { getCollection, type CollectionEntry } from 'astro:content';
import { dateLocale, paths, type Locale } from '../i18n';

export type Post = CollectionEntry<'blog'>;

/** Artikel dalam satu bahasa, terbaru lebih dulu. */
export async function getPosts(l: Locale): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => p.data.lang === l);
  // Urutan kedua lewat `key` agar halaman daftar ID & EN berisi artikel yang sama.
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.key.localeCompare(b.data.key));
}

/** Ukuran satu halaman daftar artikel. */
export const POSTS_PER_PAGE = 6;

export function blogPagePath(l: Locale, page: number): string {
  return page > 1 ? `${paths.blog(l)}${page}/` : paths.blog(l);
}

export function postPath(p: Post): string {
  return paths.post(p.data.lang, p.data.slug);
}

/** Alamat artikel yang sama di tiap bahasa (untuk hreflang & tombol ganti bahasa). */
export async function postAlternates(p: Post): Promise<Partial<Record<Locale, string>>> {
  const versions = await getCollection('blog', (q) => q.data.key === p.data.key);
  return Object.fromEntries(versions.map((v) => [v.data.lang, postPath(v)]));
}

export function formatDate(date: Date, l: Locale): string {
  return new Intl.DateTimeFormat(dateLocale[l], { dateStyle: 'long' }).format(date);
}
