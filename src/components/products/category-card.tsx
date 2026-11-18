import React from 'react'
import Link from 'next/link'
import { Category } from '@/types'
import { ArrowUpRight } from 'lucide-react'

interface CategoryCardProps {
  category: Category
  index?: number
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link
      href={`/collections?category=${category.slug}`}
      className="group relative block overflow-hidden bg-[#35332F] aspect-[4/5] sm:aspect-[3/4]"
    >
      {/* Background Image */}
      <img
        src={category.image_path || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-95"
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#35332F]/90 via-[#35332F]/30 to-transparent transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-[#F5F1E9]">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C7B1] font-sans mb-1 font-medium">
          Category 0{category.sort_order || index + 1}
        </span>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-2 text-xs text-[#D8C7B1]/80 font-sans line-clamp-2 max-w-xs transition-opacity duration-300">
                {category.description}
              </p>
            )}
          </div>
          <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 ml-3 group-hover:bg-[#F5F1E9] group-hover:text-[#35332F] transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
