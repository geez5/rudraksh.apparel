import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/products'
import { ProductDetailView } from '@/components/catalogue/product-detail-view'
import { ArrowLeft, Lock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Garment Specification | RUDRAKSH',
    }
  }

  return {
    title: `${product.name} (${product.sku}) | RUDRAKSH Private Showroom`,
    description: product.description || 'Confidential garment specification and sourcing details.',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#35332F] flex flex-col">
      {/* Top Breadcrumb bar */}
      <header className="bg-[#FEFCF8] border-b border-[#35332F]/10 py-4 px-6 sm:px-8 lg:px-12 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#35332F]/80 hover:text-[#35332F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Showroom</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#7A6555]">
            <Lock className="w-3 h-3" />
            <span>Confidential Tech Pack • SKU: {product.sku}</span>
          </div>
        </div>
      </header>

      {/* Main Interactive Product Detail View Component */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full">
        <ProductDetailView product={product} />
      </main>
    </div>
  )
}
