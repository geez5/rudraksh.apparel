'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT US' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/capabilities', label: 'MANUFACTURING' },
  { href: '/craftsmanship', label: 'PRINTS & TEXTILES' },
  { href: '/#sustainability', label: 'SUSTAINABILITY' },
  { href: '/contact', label: 'CONTACT' },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#35332F]/10 py-4 shadow-[0_2px_15px_-3px_rgba(53,51,47,0.05)]'
            : 'bg-[#F5F1E9]/80 backdrop-blur-xs py-6 border-b border-[#35332F]/5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Brand Mark */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-[28px] tracking-[0.14em] text-[#35332F] font-light uppercase transition-opacity hover:opacity-85">
              RUDRAKSH
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#777B65] font-sans font-medium -mt-1 hidden sm:block">
              Apparel Manufacturing & Export
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-[11px] tracking-[0.2em] font-sans font-medium text-[#35332F]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-all duration-300 py-1.5 relative group ${
                    isActive
                      ? 'text-[#35332F] font-semibold'
                      : 'text-[#35332F]/70 hover:text-[#35332F]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#35332F] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/catalogue-request"
              className="text-[11px] tracking-[0.2em] text-[#35332F]/80 hover:text-[#35332F] font-sans uppercase transition-colors px-3 py-2"
            >
              Showroom Access
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-2.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#A76C50] hover:text-white"
            >
              <span>PARTNER WITH US</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden text-[#35332F] p-2 focus:outline-none hover:text-[#A76C50] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F5F1E9] flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300 overflow-y-auto">
          {/* Header inside mobile menu */}
          <div className="flex items-center justify-between border-b border-[#35332F]/10 pb-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl tracking-[0.14em] text-[#35332F] font-light uppercase"
            >
              RUDRAKSH
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#35332F] p-2 hover:text-[#A76C50] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-7 h-7 stroke-[1.5]" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-6 py-10">
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between py-2 border-b border-[#35332F]/5"
              >
                <span className="font-serif text-3xl sm:text-4xl font-light text-[#35332F] group-hover:text-[#A76C50] group-hover:italic transition-all">
                  {link.label}
                </span>
                <span className="text-xs font-mono text-[#777B65] tracking-widest">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer CTAs */}
          <div className="pt-6 border-t border-[#35332F]/10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#35332F] text-[#F5F1E9] py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#A76C50] transition-colors"
            >
              PARTNER WITH US
            </Link>
            <Link
              href="/catalogue-request"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-[#35332F] text-[#35332F] py-4 text-xs font-medium tracking-[0.22em] uppercase hover:bg-[#35332F] hover:text-[#F5F1E9] transition-colors"
            >
              REQUEST CATALOGUE
            </Link>
          </div>
        </div>
      )}
    </>
  )
}