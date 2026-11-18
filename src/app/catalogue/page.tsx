import React from 'react'
import Link from 'next/link'
import { getCategories, getProducts } from '@/lib/products'
import { ProductCard } from '@/components/products/product-card'
import { Search, Filter, SlidersHorizontal, Lock, ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Digital Showroom & Full Line Sheets | RUDRAKSH',
  description:
    'Browse our private B2B digital garment showroom. Complete specifications, fabrications, and quotation requests for international fashion buyers.',
  robots: {
    index: false,
    follow: false,
  },
}

interface CataloguePageProps {
  searchParams: Promise<{
    category?: string
    tag?: string
    search?: string
    sort?: string
  }>
}

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const { category: currentCategorySlug, tag: currentTag, search: searchQuery, sort: sortOption } = await searchParams

  const categories = await getCategories()

  // Fetch all active products
  let products = await getProducts({
    categorySlug: currentCategorySlug,
    tag: currentTag,
    search: searchQuery,
  })

  // Apply sorting
  if (sortOption === 'name-asc') {
    products.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOption === 'name-desc') {
    products.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortOption === 'sku') {
    products.sort((a, b) => a.sku.localeCompare(b.sku))
  }

  // Common tags for quick filtering
  const availableTags = ['Block Print', 'Linen', 'Organic Cotton', 'Quilted', 'Resort Wear', 'Tailored']

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#35332F] flex flex-col">
      {/* Top Showroom Header */}
      <header className="bg-[#35332F] text-[#F5F1E9] py-12 px-6 sm:px-8 lg:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D8C7B1]">
              <Lock className="w-3.5 h-3.5" />
              <span>Private B2B Digital Showroom</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              Garment Line Sheets & Sampling Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#D8C7B1]/80 max-w-xl">
              Confidential wholesale lines. Click any garment to inspect high-resolution multi-angle photography, yarn compositions, and submit specification enquiries.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D8C7B1] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit To Public Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <section className="sticky top-0 z-20 bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#35332F]/10 py-4 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input Form */}
          <form method="GET" action="/catalogue" className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#7A6555] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery || ''}
              placeholder="Search by product name, SKU, or fabric..."
              className="w-full pl-10 pr-4 py-2 bg-[#FEFCF8] border border-[#35332F]/20 text-xs text-[#35332F] focus:border-[#35332F] outline-none"
            />
            {currentCategorySlug && <input type="hidden" name="category" value={currentCategorySlug} />}
          </form>

          {/* Quick Filter Tags & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6555] font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Filter:</span>
            </span>

            {availableTags.map((tag) => {
              const isActive = currentTag === tag
              return (
                <Link
                  key={tag}
                  href={
                    isActive
                      ? `/catalogue${currentCategorySlug ? `?category=${currentCategorySlug}` : ''}`
                      : `/catalogue?tag=${encodeURIComponent(tag)}${currentCategorySlug ? `&category=${currentCategorySlug}` : ''}`
                  }
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-colors border ${
                    isActive
                      ? 'bg-[#35332F] text-[#F5F1E9] border-[#35332F]'
                      : 'bg-[#FEFCF8] text-[#35332F]/80 border-[#35332F]/20 hover:border-[#35332F]'
                  }`}
                >
                  {tag}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Category Horizontal Nav */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-[#35332F]/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <Link
            href="/catalogue"
            className={`px-3 py-1.5 text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
              !currentCategorySlug
                ? 'font-bold text-[#35332F] border-b-2 border-[#35332F]'
                : 'text-[#35332F]/60 hover:text-[#35332F]'
            }`}
          >
            All Categories ({products.length})
          </Link>
          {categories.map((cat) => {
            const isActive = currentCategorySlug === cat.slug
            return (
              <Link
                key={cat.id}
                href={`/catalogue?category=${cat.slug}`}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                  isActive
                    ? 'font-bold text-[#35332F] border-b-2 border-[#35332F]'
                    : 'text-[#35332F]/60 hover:text-[#35332F]'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        {products.length === 0 ? (
          <div className="text-center py-24 bg-[#FEFCF8] border border-[#35332F]/10 p-8 space-y-4 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl text-[#35332F]">No matching silhouettes found</h3>
            <p className="text-xs text-[#5C5A54] leading-relaxed">
              Try clearing your search query or tag filters to view all active production lines.
            </p>
            <div className="pt-2">
              <Link
                href="/catalogue"
                className="inline-block px-6 py-2.5 bg-[#35332F] text-[#F5F1E9] text-xs uppercase tracking-widest"
              >
                Reset Filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer info banner */}
      <footer className="bg-[#EFE9DF] border-t border-[#35332F]/10 py-6 px-6 text-center text-xs text-[#7A6555]">
        <p>Confidential Showroom Session • Prices, MOQs and Lead Times Subject to Mill Confirmation • RUDRAKSH</p>
      </footer>
    </div>
  )
}
