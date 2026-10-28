import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';
import { categoryKeys, site, type Category } from '../config/site';
import { categoryInfo, paths, t, translateBadge, type Locale } from '../i18n';

export type Product = CollectionEntry<'products'>;

export async function getProducts(category?: Category): Promise<Product[]> {
  const all = await getCollection('products', (p) => !category || p.data.category === category);
  const rank = (p: Product) => categoryKeys.indexOf(p.data.category);
  return all.sort((a, b) => rank(a) - rank(b) || a.data.order - b.data.order);
}

export function productPath(p: Product, l: Locale): string {
  return `${paths.category(l, p.data.category)}${p.id}/`;
}

export function productName(p: Product, l: Locale): string {
  return l === 'en' ? p.data.en.name : p.data.name;
}

export function productAlt(p: Product, l: Locale): string {
  return l === 'en' ? p.data.en.imageAlt : p.data.imageAlt;
}

export function productDescription(p: Product, l: Locale): string {
  return l === 'en' ? p.data.en.description : (p.body?.trim() ?? '');
}

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return rupiah.format(price);
}

/** Harga untuk ditampilkan; produk tanpa harga tampil "Tanya harga". */
export function priceLabel(p: Product, l: Locale): string {
  return p.data.price ? formatPrice(p.data.price) : t(l).askPrice;
}

export function formatCapacity(ml?: number): string {
  return ml ? `${ml}ml` : '-';
}

/** Kapasitas jika ada (mug/tumbler), selain itu keterangan ukuran. */
export function sizeLabel(p: Product, l: Locale): string {
  return p.data.capacityMl ? formatCapacity(p.data.capacityMl) : t(l).sizeFallback;
}

export function whatsappLink(l: Locale, message: string = site.whatsapp.messages[l].general): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(p: Product, l: Locale): string {
  const values: Record<string, string> = {
    code: p.data.code,
    name: productName(p, l),
    capacity: sizeLabel(p, l),
    price: priceLabel(p, l),
    url: new URL(productPath(p, l), site.url).href,
  };
  const message = site.whatsapp.messages[l].product.replace(/\{(\w+)\}/g, (m, key) => values[key] ?? m);
  return whatsappLink(l, message);
}

export const PANEL_IMAGE_SIZE = 720;

/** Data yang dipakai panel detail (render awal dan pergantian produk di beranda). */
export async function panelData(p: Product, l: Locale) {
  const img = await getImage({
    src: p.data.image,
    width: PANEL_IMAGE_SIZE,
    height: PANEL_IMAGE_SIZE,
    fit: 'cover',
  });
  return {
    code: p.data.code,
    name: productName(p, l),
    size: sizeLabel(p, l),
    category: categoryInfo[l][p.data.category].label,
    feature: p.data.badges[0] ? translateBadge(l, p.data.badges[0]) : t(l).featureFallback,
    price: priceLabel(p, l),
    hasPrice: Boolean(p.data.price),
    desc: productDescription(p, l),
    url: productPath(p, l),
    wa: productWhatsappLink(p, l),
    img: img.src,
    alt: productAlt(p, l),
  };
}

export type PanelData = Awaited<ReturnType<typeof panelData>>;
