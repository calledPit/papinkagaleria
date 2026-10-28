import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, site, type Category } from '../config/site';

export type Product = CollectionEntry<'products'>;

export async function getProducts(category?: Category): Promise<Product[]> {
  const all = await getCollection('products', (p) => !category || p.data.category === category);
  return all.sort((a, b) => a.data.category.localeCompare(b.data.category) || a.data.order - b.data.order);
}

export function productPath(p: Product): string {
  return `/produk/${p.data.category}/${p.id}/`;
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return rupiah.format(price);
}

export function formatCapacity(ml?: number): string {
  return ml ? `${ml}ml` : '-';
}

export function whatsappLink(message: string = site.whatsapp.generalMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(p: Product): string {
  const values: Record<string, string> = {
    code: p.data.code,
    name: p.data.name,
    capacity: formatCapacity(p.data.capacityMl),
    price: formatPrice(p.data.price),
    url: new URL(productPath(p), site.url).href,
  };
  const message = site.whatsapp.productMessage.replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m);
  return whatsappLink(message);
}

export function productDescription(p: Product): string {
  return p.body?.trim() ?? '';
}

export const PANEL_IMAGE_SIZE = 720;

/** Data yang dipakai panel detail (render awal dan pergantian produk di beranda). */
export async function panelData(p: Product) {
  const img = await getImage({
    src: p.data.image,
    width: PANEL_IMAGE_SIZE,
    height: PANEL_IMAGE_SIZE,
    fit: 'cover',
  });
  return {
    code: p.data.code,
    name: p.data.name,
    capacity: formatCapacity(p.data.capacityMl),
    category: categories[p.data.category].label,
    feature: p.data.badges[0] ?? 'Bisa custom',
    price: formatPrice(p.data.price),
    desc: productDescription(p),
    url: productPath(p),
    wa: productWhatsappLink(p),
    img: img.src,
    alt: p.data.imageAlt,
  };
}

export type PanelData = Awaited<ReturnType<typeof panelData>>;
