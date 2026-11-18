'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  Inbox,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Layers },
  { href: '/admin/buyers', label: 'Buyers', icon: Users },
  { href: '/admin/requests', label: 'Catalogue Requests', icon: Inbox },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't wrap login page in sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#35332F] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#35332F] text-[#F5F1E9] p-4 flex items-center justify-between">
        <span className="font-serif text-xl tracking-widest uppercase">RUDRAKSH ADMIN</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-1"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#35332F] text-[#F5F1E9] flex flex-col justify-between p-6 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          <div>
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl tracking-[0.25em] text-white uppercase block">
                RUDRAKSH
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#D8C7B1] font-sans block">
                Executive Control Panel
              </span>
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-wider font-sans transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white font-medium border-l-2 border-[#D8C7B1]'
                      : 'text-[#D8C7B1]/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#D8C7B1]" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-[#D8C7B1]/80 hover:text-white"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-300 hover:text-red-200 uppercase tracking-widest text-[11px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
