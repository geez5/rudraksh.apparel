'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#35332F]/10 py-3.5 shadow-sm'
          : 'bg-[#F5F1E9]/75 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#35332F]"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#35332F] font-normal uppercase transition-opacity group-hover:opacity-80">
            {siteConfig.name}
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#7A6555] font-sans -mt-0.5">
            Apparel Manufacturing & Export
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.18em] uppercase font-sans font-medium text-[#35332F]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 py-1 border-b ${
                  isActive
                    ? 'border-[#35332F] text-[#35332F]'
                    : 'border-transparent text-[#35332F]/80 hover:text-[#35332F] hover:border-[#35332F]/40'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA & Catalogue Access */}
        <div className="hidden lg:flex items-center space-x-5">
          <Link
            href="/catalogue"
            className="text-xs tracking-[0.18em] uppercase text-[#35332F]/75 hover:text-[#35332F] transition-colors py-1"
          >
            Showroom
          </Link>
          <Link
            href="/catalogue-request"
            className="inline-flex items-center gap-1.5 bg-[#35332F] text-[#F5F1E9] px-5 py-2.5 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#5C5A54] rounded-none"
          >
            <span>Request Catalogue</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#35332F] p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#35332F]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F1E9] border-b border-[#35332F]/10 px-6 pt-4 pb-8 space-y-4 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-[0.18em] uppercase font-sans py-2 border-b border-[#35332F]/5 ${
                    isActive ? 'font-semibold text-[#35332F]' : 'text-[#35332F]/70'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="pt-4 flex flex-col space-y-3">
            <Link
              href="/catalogue"
              className="text-center text-xs tracking-[0.18em] uppercase border border-[#35332F] text-[#35332F] py-3 font-medium hover:bg-[#35332F] hover:text-[#F5F1E9] transition-colors"
            >
              Enter Showroom
            </Link>
            <Link
              href="/catalogue-request"
              className="text-center text-xs tracking-[0.18em] uppercase bg-[#35332F] text-[#F5F1E9] py-3 font-medium hover:bg-[#5C5A54] transition-colors"
            >
              Request Full Catalogue
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
