export const siteConfig = {
  name: 'RUDRAKSH',
  tagline: 'Thoughtfully Crafted Womenswear. Made for the World.',
  description:
    'India-based women\'s apparel manufacturer, garment exporter and sourcing partner. Premium quality manufacturing for international fashion brands, retailers and wholesalers.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rudraksh.in',
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
    address: process.env.NEXT_PUBLIC_ADDRESS || 'India',
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
  },
  categories: [
    { name: 'Dresses', slug: 'dresses', description: 'Elegant and versatile dresses for every occasion.' },
    { name: 'Tops', slug: 'tops', description: 'Contemporary tops with refined finishing.' },
    { name: 'Co-ord Sets', slug: 'coord-sets', description: 'Coordinated sets for effortless styling.' },
    { name: 'Shirts', slug: 'shirts', description: 'Precision-cut shirts with premium fabrics.' },
    { name: 'Skirts', slug: 'skirts', description: 'Flowing and structured skirts for all silhouettes.' },
    { name: 'Block Print', slug: 'block-print', description: 'Traditional block-print artistry meets modern design.' },
    { name: 'Quilted Jackets', slug: 'quilted-jackets', description: 'Artisanal quilted outerwear with distinctive texture.' },
  ],
} as const

export type SiteCategory = (typeof siteConfig.categories)[number]
