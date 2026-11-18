import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | RUDRAKSH',
    default: 'RUDRAKSH — Thoughtfully Crafted Womenswear. Made for the World.',
  },
  description:
    'India-based women\'s apparel manufacturer, garment exporter and sourcing partner. Premium quality manufacturing for international fashion brands, retailers and wholesalers.',
  keywords: ['women apparel manufacturer', 'garment exporter India', 'apparel sourcing', 'private label clothing', 'women fashion wholesale'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rudraksh.in',
    siteName: 'RUDRAKSH',
    title: 'RUDRAKSH — Thoughtfully Crafted Womenswear. Made for the World.',
    description: 'India-based women\'s apparel manufacturer and export partner.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-ivory text-charcoal font-sans min-h-screen">
        {children}
      </body>
    </html>
  )
}
