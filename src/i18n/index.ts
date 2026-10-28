/**
 * Dua bahasa: Indonesia (default, tanpa prefix) dan Inggris (/en/).
 * Semua teks antarmuka, nama kategori, dan alamat halaman per bahasa ada di file ini.
 */
import { categoryKeys, type Category } from '../config/site';

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

export const localeMeta: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  id: { label: 'ID', name: 'Bahasa Indonesia', htmlLang: 'id', ogLocale: 'id_ID' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
};

export function getLocale(url: URL): Locale {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'id';
}

export const otherLocale = (l: Locale): Locale => (l === 'id' ? 'en' : 'id');

/** Alamat halaman per bahasa. */
const base: Record<Locale, { home: string; catalog: string; howTo: string; blog: string }> = {
  id: { home: '/', catalog: '/produk/', howTo: '/cara-pesan/', blog: '/blog/' },
  en: { home: '/en/', catalog: '/en/products/', howTo: '/en/how-to-order/', blog: '/en/blog/' },
};

export const dateLocale: Record<Locale, string> = { id: 'id-ID', en: 'en-US' };

export const categoryInfo: Record<
  Locale,
  Record<Category, { slug: string; label: string; title: string; description: string }>
> = {
  id: {
    mug: {
      slug: 'mug',
      label: 'Mug',
      title: 'Mug Custom',
      description:
        'Pilihan mug custom 350ml dari Papinka Galeria: mug bertutup dengan logo, motif kayu, mug enamel, hingga full print dengan gagang rajut.',
    },
    tumbler: {
      slug: 'tumbler',
      label: 'Tumbler',
      title: 'Tumbler Custom',
      description:
        'Tumbler custom 300–500ml dari Papinka Galeria, termasuk tumbler dengan grafir logo untuk souvenir perusahaan dan hadiah.',
    },
    totebag: {
      slug: 'totebag',
      label: 'Totebag',
      title: 'Totebag Custom',
      description:
        'Tas botol/tumbler dan tas buku/dokumen custom berbahan poliester, blacu, atau spunbond, dengan sablon satu warna atau DTF full color.',
    },
    kerajinan: {
      slug: 'kerajinan',
      label: 'Kerajinan',
      title: 'Kerajinan Bambu & Batok',
      description:
        'Anyaman bambu dan batok kelapa: tas keranjang, rantang, piring, kotak tisu, tempat pensil, hingga gelas batok. Cocok untuk hampers dan souvenir.',
    },
    buku: {
      slug: 'pembatas-buku',
      label: 'Pembatas Buku',
      title: 'Pembatas Buku',
      description:
        'Pembatas buku dari Papinka Galeria, dari motif wayang, lukisan, hingga kayu. Cocok untuk hadiah dan souvenir.',
    },
  },
  en: {
    mug: {
      slug: 'mugs',
      label: 'Mugs',
      title: 'Custom Mugs',
      description:
        'Custom 350ml mugs from Papinka Galeria: lidded mugs with your logo, wood patterns, enamel mugs, and full-print mugs with knitted handles.',
    },
    tumbler: {
      slug: 'tumblers',
      label: 'Tumblers',
      title: 'Custom Tumblers',
      description:
        'Custom 300–500ml tumblers from Papinka Galeria, including logo-engraved tumblers for corporate souvenirs and gifts.',
    },
    totebag: {
      slug: 'tote-bags',
      label: 'Tote Bags',
      title: 'Custom Tote Bags',
      description:
        'Custom bottle/tumbler bags and book/document bags in polyester, calico, or spunbond, with single-color or full-color DTF printing.',
    },
    kerajinan: {
      slug: 'crafts',
      label: 'Crafts',
      title: 'Bamboo & Coconut Shell Crafts',
      description:
        'Woven bamboo and coconut shell crafts: basket bags, food carriers, plates, tissue boxes, pencil holders, and coconut shell cups. Great for hampers and souvenirs.',
    },
    buku: {
      slug: 'bookmarks',
      label: 'Bookmarks',
      title: 'Bookmarks',
      description: 'Bookmarks from Papinka Galeria, from wayang and painting motifs to wood. Great for gifts and souvenirs.',
    },
  },
};

export const paths = {
  home: (l: Locale) => base[l].home,
  catalog: (l: Locale) => base[l].catalog,
  howTo: (l: Locale) => base[l].howTo,
  blog: (l: Locale) => base[l].blog,
  post: (l: Locale, slug: string) => `${base[l].blog}${slug}/`,
  category: (l: Locale, c: Category) => `${base[l].catalog}${categoryInfo[l][c].slug}/`,
};

export function categoryFromSlug(l: Locale, slug: string): Category | undefined {
  return categoryKeys.find((c) => categoryInfo[l][c].slug === slug);
}

/** Terjemahan label keunggulan produk (field `badges`). */
const badgeEn: Record<string, string> = {
  'Bisa custom': 'Customizable',
  'Tidak bisa custom': 'Not customizable',
  'Include grafir': 'Engraving included',
  'Full print': 'Full print',
  'Gagang rajut': 'Knitted handle',
};

export function translateBadge(l: Locale, badge: string): string {
  return l === 'en' ? (badgeEn[badge] ?? badge) : badge;
}

export const ui = {
  id: {
    tagline: 'Souvenir Custom Palembang & Lampung',
    description:
      'Papinka Galeria menyediakan souvenir custom di Palembang, Lampung, dan Sumatera Selatan: mug, tumbler, totebag, kerajinan bambu, dan pembatas buku dengan logo, sablon, atau grafir.',
    customNote: 'Untuk produk custom, harga menyesuaikan desain dan spesifikasi pesanan.',
    skip: 'Langsung ke konten',
    navMain: 'Navigasi utama',
    navFooter: 'Navigasi footer',
    home: 'Beranda',
    catalog: 'Katalog',
    products: 'Produk',
    howTo: 'Cara Pesan',
    switchLang: 'Ganti bahasa',
    homeLines: ['Temukan', 'Souvenir Custom', 'Untukmu'],
    homeTag: '#SouvenirCustom',
    homeText:
      'Mug, tumbler, totebag, hingga kerajinan bambu yang bisa dipersonalisasi dengan logo, nama, atau desain Anda. Cocok untuk hadiah, hampers, dan souvenir perusahaan.',
    viewCatalog: 'Lihat Katalog',
    catalogTitle: 'Katalog Souvenir Custom',
    catalogHeading: 'Katalog',
    catalogHighlight: 'Souvenir Custom',
    catalogDescription:
      'Katalog souvenir custom Papinka Galeria: mug, tumbler, totebag, kerajinan bambu, dan pembatas buku untuk hadiah, hampers, dan souvenir perusahaan.',
    collection: 'Koleksi',
    categoryTitleSuffix: 'Harga & Pilihan',
    all: 'Semua',
    filterLabel: 'Filter kategori',
    more: (label: string) => `${label} lainnya`,
    viewAll: 'Lihat semua →',
    productDetail: 'Detail produk',
    backToCatalog: 'Kembali ke katalog',
    prev: 'Produk sebelumnya',
    next: 'Produk berikutnya',
    readMore: 'Selengkapnya',
    sizeFallback: 'Ukuran & warna',
    featureFallback: 'Bisa custom',
    askPrice: 'Tanya harga',
    orderLabel: 'Pesan via WhatsApp',
    orderAria: (code: string) => `Pesan ${code} via WhatsApp`,
    chat: 'Chat WhatsApp',
    priceFrom: (price: string) => `harga ${price}`,
    from: 'dari',
    howToTitle: 'Cara Pesan Souvenir Custom',
    howToDescription:
      'Cara pesan souvenir custom di Papinka Galeria: pilih produk, chat WhatsApp, kirim desain, lalu konfirmasi pesanan.',
    howToLines: ['Cara', 'Pesan'],
    steps: [
      { title: 'Pilih produk', text: 'Lihat katalog dan catat kode produk yang Anda suka, misalnya MUG 001.' },
      { title: 'Chat WhatsApp', text: 'Klik tombol pesan di halaman produk. Kode dan nama produk otomatis terisi.' },
      { title: 'Kirim desain', text: 'Kirim logo, nama, atau gambar yang ingin dicetak, beserta jumlah pesanan.' },
      { title: 'Konfirmasi', text: 'Kami kirim penawaran harga dan detail pesanan, lalu pesanan diproses.' },
    ],
    customOptionsTitle: 'Pilihan custom',
    customOptions: ['Custom logo', 'Grafir nama/logo', 'Full print', 'Sablon totebag', 'Ukuran & warna kerajinan'],
    blog: 'Blog',
    blogTitle: 'Blog: Ide & Tips Souvenir Custom',
    blogDescription:
      'Ide souvenir kantor, souvenir pernikahan, souvenir ramah lingkungan, dan tips memilih teknik custom dari Papinka Galeria.',
    blogLines: ['Ide & Tips', 'Souvenir'],
    readArticle: 'Baca artikel',
    pageLabel: (n: number) => `Halaman ${n}`,
    pagination: 'Navigasi halaman',
    prevPage: '← Sebelumnya',
    nextPage: 'Berikutnya →',
    relatedProducts: 'Produk di artikel ini',
    backToBlog: '← Semua artikel',
    articleCtaTitle: 'Butuh souvenir untuk acara Anda?',
    articleCtaText:
      'Ceritakan acara, jumlah, dan desain yang Anda mau. Kami melayani pesanan dari Palembang, Lampung, dan seluruh Sumatera Selatan.',
    serviceArea: 'Area layanan',
    notFoundTitle: 'Halaman tidak ditemukan',
    notFoundLines: ['Halaman', 'tidak ditemukan'],
    notFoundText: 'Halaman yang Anda cari mungkin sudah dipindah. Silakan lihat katalog kami.',
  },
  en: {
    tagline: 'Custom Souvenirs in Palembang & Lampung',
    description:
      'Papinka Galeria makes custom souvenirs in Palembang, Lampung, and South Sumatra: mugs, tumblers, tote bags, bamboo crafts, and bookmarks with your logo, print, or engraving.',
    customNote: 'For custom products, prices depend on the design and order specifications.',
    skip: 'Skip to content',
    navMain: 'Main navigation',
    navFooter: 'Footer navigation',
    home: 'Home',
    catalog: 'Catalog',
    products: 'Products',
    howTo: 'How to Order',
    switchLang: 'Change language',
    homeLines: ['Find', 'Custom Souvenirs', 'For You'],
    homeTag: '#CustomSouvenirs',
    homeText:
      'Mugs, tumblers, tote bags, and bamboo crafts personalized with your logo, name, or design. Perfect for gifts, hampers, and corporate souvenirs.',
    viewCatalog: 'View Catalog',
    catalogTitle: 'Custom Souvenir Catalog',
    catalogHeading: 'Catalog',
    catalogHighlight: 'Custom Souvenirs',
    catalogDescription:
      'Papinka Galeria custom souvenir catalog: mugs, tumblers, tote bags, bamboo crafts, and bookmarks for gifts, hampers, and corporate souvenirs.',
    collection: 'Collection',
    categoryTitleSuffix: 'Prices & Options',
    all: 'All',
    filterLabel: 'Category filter',
    more: (label: string) => `More ${label}`,
    viewAll: 'View all →',
    productDetail: 'Product details',
    backToCatalog: 'Back to catalog',
    prev: 'Previous product',
    next: 'Next product',
    readMore: 'Read more',
    sizeFallback: 'Sizes & colors',
    featureFallback: 'Customizable',
    askPrice: 'Ask for price',
    orderLabel: 'Order via WhatsApp',
    orderAria: (code: string) => `Order ${code} via WhatsApp`,
    chat: 'Chat on WhatsApp',
    priceFrom: (price: string) => `price ${price}`,
    from: 'by',
    howToTitle: 'How to Order Custom Souvenirs',
    howToDescription:
      'How to order custom souvenirs from Papinka Galeria: choose a product, chat on WhatsApp, send your design, and confirm your order.',
    howToLines: ['How to', 'Order'],
    steps: [
      { title: 'Choose a product', text: 'Browse the catalog and note the product code you like, for example MUG 001.' },
      { title: 'Chat on WhatsApp', text: 'Tap the order button on the product page. The product code and name are filled in for you.' },
      { title: 'Send your design', text: 'Send the logo, name, or image you want printed, along with the order quantity.' },
      { title: 'Confirm', text: 'We send a price quote and order details, then your order goes into production.' },
    ],
    customOptionsTitle: 'Custom options',
    customOptions: ['Custom logo', 'Name/logo engraving', 'Full print', 'Tote bag printing', 'Craft sizes & colors'],
    blog: 'Blog',
    blogTitle: 'Blog: Custom Souvenir Ideas & Tips',
    blogDescription:
      'Corporate souvenir ideas, wedding favors, eco-friendly souvenirs, and tips for choosing a customization technique from Papinka Galeria.',
    blogLines: ['Souvenir', 'Ideas & Tips'],
    readArticle: 'Read article',
    pageLabel: (n: number) => `Page ${n}`,
    pagination: 'Pagination',
    prevPage: '← Previous',
    nextPage: 'Next →',
    relatedProducts: 'Products in this article',
    backToBlog: '← All articles',
    articleCtaTitle: 'Need souvenirs for your event?',
    articleCtaText:
      'Tell us about your event, quantity, and design. We serve orders from Palembang, Lampung, and all of South Sumatra.',
    serviceArea: 'Service area',
    notFoundTitle: 'Page not found',
    notFoundLines: ['Page', 'not found'],
    notFoundText: 'The page you are looking for may have moved. Please browse our catalog.',
  },
} satisfies Record<Locale, unknown>;

export const t = (l: Locale) => ui[l];
