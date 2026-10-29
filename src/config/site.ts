/**
 * Pengaturan utama website Papinka Galeria.
 * Ubah nilai di file ini untuk mengganti nomor WhatsApp, template pesan, dan media sosial.
 * Teks antarmuka & nama kategori per bahasa ada di src/i18n/index.ts.
 */
export const site = {
  name: 'Papinka Galeria',
  url: 'https://papinkagaleria.com',

  whatsapp: {
    /** Format internasional tanpa "+", spasi, atau tanda hubung. Contoh: 6281234567890 */
    number: '6281237397796',

    /**
     * Template pesan per bahasa.
     * - general: tombol WhatsApp umum (sidebar, topbar, halaman Cara Pesan)
     * - product: tombol di kartu & halaman produk. Placeholder: {code} {name} {capacity} {price} {url}
     */
    messages: {
      id: {
        general: 'Halo Papinka Galeria, saya ingin bertanya tentang souvenir custom.',
        product: 'Halo Papinka Galeria, saya tertarik dengan {code} - {name}.\n{url}\n\nBoleh info harga dan detailnya?',
      },
      en: {
        general: 'Hello Papinka Galeria, I would like to ask about custom souvenirs.',
        product: "Hello Papinka Galeria, I'm interested in {code} - {name}.\n{url}\n\nCould you share the price and details?",
      },
    },
  },

  /** Jam operasional (WIB). Dipakai di halaman Cara Pesan, footer, dan data untuk Google. */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '17:00',
  },

  social: {
    instagram: 'https://www.instagram.com/papinka_galeria',
    instagramHandle: '@papinka_galeria',
  },
} as const;

/** Urutan di sini menentukan urutan tampil kategori di katalog. */
export const categoryKeys = ['mug', 'tumbler', 'totebag', 'kerajinan', 'buku'] as const;
export type Category = (typeof categoryKeys)[number];
