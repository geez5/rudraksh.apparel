'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/collections', label: 'Collections' },
  { href: '/craftsmanship', label: 'Craftsmanship' },
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

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#35332F]/10 py-3.5 shadow-xs'
          : 'bg-[#F5F1E9]/85 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo - Exact Cormorant 30px tracking 0.04em */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-[28px] tracking-[0.05em] text-[#35332F] font-normal uppercase">
            RUDRAKSH
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-[11px] tracking-[0.16em] uppercase font-sans font-medium text-[#35332F]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-[#35332F] font-semibold border-b border-[#35332F]'
                    : 'text-[#35332F]/75 hover:text-[#35332F]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Catalogue Access CTA matching Framer: 1px border rgb(161, 138, 115) */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/catalogue-request"
            className="inline-flex items-center gap-2 border border-[#A18A73] bg-transparent text-[#35332F] px-5 py-2.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#35332F] hover:text-[#F5F1E9] hover:border-[#35332F]"
          >
            <span>REQUEST CATALOGUE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#35332F] p-2 focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
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
                  className={`text-xs tracking-[0.18em] uppercase font-sans py-2 border-b border-[#35332F]/5 ${
                    isActive ? 'font-semibold text-[#35332F]' : 'text-[#35332F]/70'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              href="/catalogue-request"
              className="text-center text-xs tracking-[0.2em] uppercase border border-[#A18A73] bg-[#35332F] text-[#F5F1E9] py-3 font-semibold"
            >
              REQUEST CATALOGUE
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
