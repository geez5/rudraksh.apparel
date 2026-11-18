'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = 2026

  return (
    <footer className="bg-[#35332F] text-[#F5F1E9] border-t border-[#35332F]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24">
        {/* Top Header Message */}
        <div className="border-b border-white/10 pb-16 space-y-4 max-w-3xl">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium block">
            RUDRAKSH
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
            Made with intention.
          </h2>
          <p className="text-sm sm:text-base text-[#D8C7B1]/80 font-sans leading-relaxed pt-1">
            Indian craftsmanship. Contemporary womenswear. A conversation between material, maker and possibility.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-white/10">
          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C7B1] font-sans">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#F5F1E9]/80 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-white transition-colors">
                  Capabilities
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-white transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections Taxonomy */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C7B1] font-sans">
              THE COLLECTION
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#F5F1E9]/80 font-sans">
              {siteConfig.categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/collections?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private B2B Showroom */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C7B1] font-sans">
              B2B PORTAL
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#F5F1E9]/80 font-sans">
              <li>
                <Link href="/catalogue-request" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Request Private Catalogue</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D8C7B1]" />
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors">
                  Enter Showroom
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors opacity-70 hover:opacity-100">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Sourcing Hub Location */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D8C7B1] font-sans">
              LOCATION
            </h4>
            <p className="text-xs text-[#D8C7B1]/80 leading-relaxed font-sans">
              Women’s Apparel Manufacturing & Sourcing Hub<br />
              India
            </p>
            <p className="text-[11px] text-[#A18A73] font-sans pt-1">
              Global export to Europe, United Kingdom, North America & Australia.
            </p>
          </div>
        </div>

        {/* Bottom Bar matching Framer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#D8C7B1]/60 font-sans">
          <p>© {currentYear} RUDRAKSH  /  THE ART OF MAKING</p>
          <p className="max-w-md text-left sm:text-right">
            Illustrative editorial imagery. Actual garment photography and collection specifications to follow.
          </p>
        </div>
      </div>
    </footer>
  )
}
