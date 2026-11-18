import React from 'react'
import Link from 'next/link'
import { getProducts, getCategories } from '@/lib/products'
import {
  Package,
  Layers,
  Users,
  Inbox,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from 'lucide-react'

export const metadata = {
  title: 'Executive Dashboard | RUDRAKSH Admin',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const products = await getProducts()
  const categories = await getCategories()

  const activeProducts = products.filter((p) => p.status === 'active')
  const archivedProducts = products.filter((p) => p.status === 'archived')
  const featuredProducts = products.filter((p) => p.featured)

  // Real or initial stats
  const stats = [
    { label: 'Total Products', value: products.length, sub: `${activeProducts.length} Active`, icon: Package, href: '/admin/products' },
    { label: 'Active Categories', value: categories.length, sub: '7 core categories', icon: Layers, href: '/admin/categories' },
    { label: 'Verified Buyers', value: 14, sub: 'Global fashion brands', icon: Users, href: '/admin/buyers' },
    { label: 'Catalogue Requests', value: 28, sub: '3 Pending Review', icon: Inbox, href: '/admin/requests' },
    { label: 'Active Access Grants', value: 12, sub: '30-day showroom access', icon: ShieldCheck, href: '/admin/buyers' },
    { label: 'Total Inquiries', value: 19, sub: '5 New this week', icon: MessageSquare, href: '/admin/enquiries' },
  ]

  // Recent Requests Mock/DB view
  const recentRequests = [
    { name: 'Sarah Jenkins', company: 'Atelier Marais Paris', country: 'France', type: 'Fashion Brand', status: 'pending', date: '2 hours ago' },
    { name: 'Marcus Sterling', company: 'Sterling Sourcing UK', country: 'United Kingdom', type: 'Sourcing Agent', status: 'approved', date: 'Yesterday' },
    { name: 'Elena Rostova', company: 'Nordic Resortwear', country: 'Sweden', type: 'Retailer', status: 'approved', date: '2 days ago' },
    { name: 'Kavita Mehta', company: 'Veda Collective', country: 'Australia', type: 'Private Label', status: 'approved', date: '3 days ago' },
  ]

  // Recent Inquiries
  const recentEnquiries = [
    { name: 'Sarah Jenkins', product: 'RDK-DRS-001 (Sanganeri Tiered Dress)', qty: '150 pcs', date: 'Today' },
    { name: 'Marcus Sterling', product: 'RDK-JKT-002 (Reversible Quilted Jacket)', qty: '200 pcs', date: 'Yesterday' },
    { name: 'Elena Rostova', product: 'RDK-CRD-003 (Linen Relaxed Co-ord)', qty: '120 sets', date: '3 days ago' },
  ]

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
            Administrative Console
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
            Executive Operations Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products?action=new"
            className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-5 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-[#5C5A54]"
          >
            <span>+ Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Link
              key={s.label}
              href={s.href}
              className="bg-[#FEFCF8] p-6 border border-[#35332F]/10 hover:border-[#A18A73] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#7A6555] font-medium">
                  {s.label}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F5F1E9] flex items-center justify-center text-[#70745C] group-hover:bg-[#35332F] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light">
                  {s.value}
                </p>
                <p className="text-[11px] text-[#5C5A54] mt-1">{s.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Catalogue Requests */}
        <div className="bg-[#FEFCF8] border border-[#35332F]/10 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#35332F]/10">
            <div>
              <h3 className="font-serif text-xl text-[#35332F]">Recent Catalogue Requests</h3>
              <p className="text-[11px] text-[#7A6555]">Latest buyer access applications</p>
            </div>
            <Link
              href="/admin/requests"
              className="text-xs uppercase tracking-widest text-[#35332F] hover:text-[#7A6555] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#35332F]/5 space-y-1">
            {recentRequests.map((r, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-[#35332F]">{r.name}</p>
                  <p className="text-[#7A6555] text-[11px]">
                    {r.company} • {r.country} ({r.type})
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium ${
                      r.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {r.status}
                  </span>
                  <p className="text-[10px] text-[#5C5A54]/70 mt-0.5">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Line Inquiries */}
        <div className="bg-[#FEFCF8] border border-[#35332F]/10 p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#35332F]/10">
            <div>
              <h3 className="font-serif text-xl text-[#35332F]">Specification Inquiries</h3>
              <p className="text-[11px] text-[#7A6555]">Incoming quotation requests</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs uppercase tracking-widest text-[#35332F] hover:text-[#7A6555] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#35332F]/5 space-y-1">
            {recentEnquiries.map((e, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="max-w-[70%]">
                  <p className="font-medium text-[#35332F]">{e.product}</p>
                  <p className="text-[#7A6555] text-[11px]">Inquired by: {e.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-[#70745C]">{e.qty}</span>
                  <p className="text-[10px] text-[#5C5A54]/70 mt-0.5">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
