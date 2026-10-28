/**
 * Pengaturan utama website Papinka Galeria.
 * Ubah nilai di file ini untuk mengganti nomor WhatsApp, template pesan, dan info toko.
 */
export const site = {
  name: 'Papinka Galeria',
  url: 'https://papinkagaleria.com',
  tagline: 'Mug & Tumbler Custom',
  description:
    'Papinka Galeria menyediakan mug dan tumbler custom: grafir logo, nama, dan full print. Cocok untuk hadiah, komunitas, dan souvenir perusahaan.',
  customNote: 'Untuk produk custom, harga menyesuaikan desain dan spesifikasi pesanan.',

  whatsapp: {
    /** Format internasional tanpa "+", spasi, atau tanda hubung. Contoh: 6281234567890 */
    number: '6281234567890',

    /** Label tombol WhatsApp. */
    label: 'Pesan via WhatsApp',

    /** Pesan untuk tombol WhatsApp umum (header, beranda, footer). */
    generalMessage: 'Halo Papinka Galeria, saya ingin bertanya tentang mug/tumbler custom.',

    /**
     * Pesan untuk tombol di halaman produk.
     * Placeholder yang tersedia: {code} {name} {capacity} {price} {url}
     */
    productMessage:
      'Halo Papinka Galeria, saya tertarik dengan {code} - {name} ({capacity}, {price}).\n{url}\n\nBoleh info lebih lanjut?',
  },

  social: {
    instagram: '',
  },
} as const;

export type Category = 'mug' | 'tumbler';

export const categories: Record<Category, { label: string; title: string; description: string }> = {
  mug: {
    label: 'Mug',
    title: 'Mug Custom',
    description:
      'Pilihan mug custom 350ml dari Papinka Galeria: mug bertutup dengan logo, motif kayu, mug enamel, hingga full print dengan gagang rajut.',
  },
  tumbler: {
    label: 'Tumbler',
    title: 'Tumbler Custom',
    description:
      'Tumbler custom 300–500ml dari Papinka Galeria, termasuk tumbler dengan grafir logo untuk souvenir perusahaan dan hadiah.',
  },
};
