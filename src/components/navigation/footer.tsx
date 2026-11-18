'use client'

import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ArrowUpRight, Mail, MapPin, Globe } from 'lucide-react'

export function Footer() {
  const currentYear = 2026

  return (
    <footer className="bg-[#35332F] text-[#F5F1E9] border-t border-[#35332F]">
      {/* Top Banner CTA */}
      <div className="border-b border-white/10 py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
              Private B2B Garment Showroom
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Ready to discuss manufacturing your next collection?
            </h3>
            <p className="text-sm text-[#D8C7B1]/80 font-sans leading-relaxed">
              We partner with fashion brands, retailers, and private labels globally to provide fabric sourcing, precision sampling, and end-to-end garment export.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#D8C7B1] text-[#35332F] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white"
            >
              <span>Request Full Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10"
            >
              <span>Contact Sourcing Team</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-white uppercase block">
                {siteConfig.name}
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D8C7B1] font-sans block -mt-0.5">
                Apparel Manufacturing & Export • India
              </span>
            </Link>
            <p className="text-sm text-[#D8C7B1]/75 leading-relaxed font-sans max-w-sm">
              Thoughtfully crafted womenswear engineered for international fashion markets. From fabric curation and artisanal techniques to full-scale export production.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#D8C7B1]/90">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8C7B1]" />
                <span>Manufacturing & Sourcing Hub, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#D8C7B1]" />
                <span>Global Export to UK, Europe, North America & APAC</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-white mb-5 font-sans">
              Apparel Categories
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#D8C7B1]/80 font-sans">
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

          {/* Capabilities & Craft */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-white mb-5 font-sans">
              Capabilities
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#D8C7B1]/80 font-sans">
              <li>
                <Link href="/capabilities#sampling" className="hover:text-white transition-colors">
                  Sampling & Development
                </Link>
              </li>
              <li>
                <Link href="/capabilities#fabric-sourcing" className="hover:text-white transition-colors">
                  Fabric Sourcing
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship#block-print" className="hover:text-white transition-colors">
                  Hand Block Printing
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship#quilting" className="hover:text-white transition-colors">
                  Artisanal Quilting
                </Link>
              </li>
              <li>
                <Link href="/capabilities#quality-assurance" className="hover:text-white transition-colors">
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link href="/capabilities#export-logistics" className="hover:text-white transition-colors">
                  Packaging & Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Legal */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] uppercase text-white mb-5 font-sans">
              Company
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#D8C7B1]/80 font-sans">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Rudraksh
                </Link>
              </li>
              <li>
                <Link href="/catalogue-request" className="hover:text-white transition-colors">
                  Request Digital Catalogue
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  B2B Enquiries
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors opacity-60 hover:opacity-100">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-6 sm:px-8 lg:px-12 text-xs text-[#D8C7B1]/60 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} RUDRAKSH. All rights reserved. B2B Apparel Manufacturing & Export.</p>
          <div className="flex items-center space-x-6">
            <span>Confidential B2B Showroom</span>
            <span className="hidden sm:inline">•</span>
            <span>Crafted with Indian Textile Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
