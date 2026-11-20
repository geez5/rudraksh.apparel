'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = 2026

  return (
    <footer className="bg-[#292825] text-[#F5F1E9] border-t border-[#35332F]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-24">
        {/* Top Brand & Purpose Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold block">
              RUDRAKSH / APPAREL MANUFACTURING & EXPORT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F5F1E9] leading-tight">
              The Art of Making.
            </h2>
            <p className="text-sm sm:text-base text-[#D8C7B1] font-sans leading-relaxed max-w-xl pt-1">
              A women’s apparel manufacturing and export house creating export-quality readymade garments through a disciplined combination of contemporary Western design, traditional Indian textile craftsmanship, and responsible production.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-5 lg:pt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F5F1E9] text-[#292825] px-8 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#A76C50] hover:text-white"
            >
              <span>START A PARTNERSHIP</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 border border-[#A18A73] text-[#F5F1E9] px-7 py-3.5 text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              <span>REQUEST CATALOGUE</span>
            </Link>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 py-16 border-b border-white/10">
          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A76C50] font-sans">
              HOUSE
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D8C7B1]/85 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-white transition-colors">
                  Manufacturing Capabilities
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-white transition-colors">
                  Prints & Textiles
                </Link>
              </li>
              <li>
                <Link href="/#sustainability" className="hover:text-white transition-colors">
                  Responsible Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Garment Categories */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A76C50] font-sans">
              CATEGORIES
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D8C7B1]/85 font-sans">
              <li>
                <Link href="/collections?category=quilted-jackets" className="hover:text-white transition-colors">
                  Quilted Jackets
                </Link>
              </li>
              <li>
                <Link href="/collections?category=dresses" className="hover:text-white transition-colors">
                  Western Dresses
                </Link>
              </li>
              <li>
                <Link href="/collections?category=skirts" className="hover:text-white transition-colors">
                  Skirts
                </Link>
              </li>
              <li>
                <Link href="/collections?category=tops" className="hover:text-white transition-colors">
                  Tops & Shirts
                </Link>
              </li>
              <li>
                <Link href="/collections?category=coord-sets" className="hover:text-white transition-colors">
                  Co-ord Sets
                </Link>
              </li>
              <li>
                <Link href="/collections?category=block-print" className="hover:text-white transition-colors">
                  Printed Apparel
                </Link>
              </li>
            </ul>
          </div>

          {/* Printing & Craftsmanship */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A76C50] font-sans">
              PRINT & TEXTILE
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D8C7B1]/85 font-sans">
              <li>
                <Link href="/craftsmanship#block-print" className="hover:text-white transition-colors">
                  Hand Block Printing
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship#tie-dye" className="hover:text-white transition-colors">
                  Tie & Dye Techniques
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship#digital-print" className="hover:text-white transition-colors">
                  Contemporary Digital Print
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship#quilting" className="hover:text-white transition-colors">
                  Artisanal Cotton Quilting
                </Link>
              </li>
              <li>
                <Link href="/capabilities#fabric-sourcing" className="hover:text-white transition-colors">
                  Pure Cottons & Flax Linens
                </Link>
              </li>
            </ul>
          </div>

          {/* B2B Sourcing Portal */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A76C50] font-sans">
              B2B PARTNERSHIPS
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-[#D8C7B1]/85 font-sans">
              <li>
                <Link href="/catalogue-request" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Digital Showroom Access</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A76C50]" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Submit Tech Pack & RFQ
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors text-[#A18A73]">
                  Admin Management
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-[#A18A73] leading-relaxed">
                Exporting worldwide from verified apparel manufacturing facilities in India.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#D8C7B1]/60 font-sans gap-4">
          <p>© {currentYear} RUDRAKSH. Contemporary Women’s Apparel Manufacturing & Export.</p>
          <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase">
            <span>Made In India</span>
            <span>•</span>
            <span>Worldwide Export</span>
            <span>•</span>
            <span>Ethical Production</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
