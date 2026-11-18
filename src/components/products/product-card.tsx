'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
  priority?: boolean
  showCategory?: boolean
}

export function ProductCard({ product, priority = false, showCategory = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Find primary and secondary images
  const primaryImage = product.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
  const secondaryImage = product.images?.[1]?.storage_path || primaryImage

  return (
    <article
      className="group relative flex flex-col bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Quiet Luxury Aspect Ratio */}
      <Link
        href={`/catalogue/${product.slug}`}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#D8C7B1]/20 block"
      >
        <img
          src={isHovered && secondaryImage ? secondaryImage : primaryImage}
          alt={product.images?.[0]?.alt_text || product.name}
          className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Subtle Tag Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.tags?.slice(0, 2).map((t) => (
            <span
              key={t.id}
              className="bg-[#F5F1E9]/90 backdrop-blur-xs text-[#35332F] text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 font-sans font-medium"
            >
              {t.tag}
            </span>
          ))}
        </div>

        {/* Quick View Prompt on Hover */}
        <div className="absolute inset-0 bg-[#35332F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="w-full text-center bg-[#F5F1E9] text-[#35332F] py-2.5 text-xs tracking-[0.2em] uppercase font-sans font-medium shadow-sm flex items-center justify-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-4 flex flex-col space-y-1.5">
        <div className="flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[#7A6555] font-sans">
          <span>{product.sku}</span>
          {showCategory && product.category && (
            <span className="text-[#70745C] font-medium">{product.category.name}</span>
          )}
        </div>

        <h3 className="font-serif text-lg text-[#35332F] font-normal leading-snug group-hover:text-[#7A6555] transition-colors">
          <Link href={`/catalogue/${product.slug}`}>{product.name}</Link>
        </h3>

        {product.fabric && (
          <p className="text-xs text-[#5C5A54] font-sans line-clamp-1">
            <span className="text-[#35332F]/50">Fabric:</span> {product.fabric}
          </p>
        )}

        {product.moq && (
          <p className="text-[11px] text-[#7A6555] tracking-wider font-sans">
            MOQ: {product.moq}
          </p>
        )}
      </div>
    </article>
  )
}
