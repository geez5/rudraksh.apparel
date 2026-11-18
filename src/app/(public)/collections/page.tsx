import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Filter } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/products'
import { ProductCard } from '@/components/products/product-card'

export const metadata = {
  title: 'Garment Collections & Categories | RUDRAKSH',
  description:
    'Discover our premium womenswear product lines: dresses, tops, co-ord sets, shirts, skirts, hand block prints, and quilted jackets.',
}

interface CollectionsPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const { category: currentCategorySlug, tag: currentTag } = await searchParams
  const categories = await getCategories()

  // Fetch products based on category or tag
  const products = await getProducts({
    categorySlug: currentCategorySlug,
    tag: currentTag,
    publicPreviewOnly: true,
  })

  const currentCategory = categories.find((c) => c.slug === currentCategorySlug)

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              Womenswear Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              {currentCategory ? currentCategory.name : 'Collections & Silhouette Lines'}
            </h1>
            <p className="text-base text-[#5C5A54] font-sans leading-relaxed">
              {currentCategory
                ? currentCategory.description
                : 'Browse sample silhouettes across our 7 core product categories. Every garment is customizable for your brand’s label, fabrics, sizing, and color palette.'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs & Filter Navigation */}
      <section className="sticky top-20 z-30 bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#35332F]/10 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <Link
              href="/collections"
              className={`px-4 py-2 text-xs tracking-[0.18em] uppercase font-sans font-medium whitespace-nowrap transition-colors rounded-none ${
                !currentCategorySlug
                  ? 'bg-[#35332F] text-[#F5F1E9]'
                  : 'text-[#35332F]/70 hover:text-[#35332F] hover:bg-[#35332F]/5'
              }`}
            >
              All Categories
            </Link>
            {categories.map((cat) => {
              const isActive = currentCategorySlug === cat.slug
              return (
                <Link
                  key={cat.id}
                  href={`/collections?category=${cat.slug}`}
                  className={`px-4 py-2 text-xs tracking-[0.18em] uppercase font-sans font-medium whitespace-nowrap transition-colors rounded-none ${
                    isActive
                      ? 'bg-[#35332F] text-[#F5F1E9]'
                      : 'text-[#35332F]/70 hover:text-[#35332F] hover:bg-[#35332F]/5'
                  }`}
                >
                  {cat.name}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-[#FEFCF8] border border-[#35332F]/10 p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#35332F]">No sample previews currently displayed</h3>
              <p className="text-sm text-[#5C5A54] max-w-md mx-auto">
                Additional silhouettes are confidential and available in our private buyer showroom.
              </p>
              <Link
                href="/catalogue-request"
                className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-3 text-xs tracking-widest uppercase"
              >
                <span>Request Digital Line Sheet</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Confidentiality Notice Banner */}
          <div className="mt-20 p-8 sm:p-12 bg-[#35332F] text-[#F5F1E9] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#D8C7B1]">
                Confidential B2B Showroom
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                Looking for our complete seasonal lines?
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C7B1]/80 leading-relaxed">
                This public collection showcases representative silhouettes only. To protect buyer exclusivity, our full catalogue of over 100+ active styles, detailed spec sheets, and wholesale price ladders is password-protected.
              </p>
            </div>
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#D8C7B1] text-[#35332F] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all shrink-0"
            >
              <span>Request Showroom Access</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
