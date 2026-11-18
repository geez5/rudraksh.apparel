'use client'

import React, { useState } from 'react'
import { Users, Search, ShieldCheck, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react'

interface BuyerItem {
  id: string
  name: string
  email: string
  company: string
  country: string
  type: string
  verified: boolean
  access_status: 'active' | 'expired' | 'revoked' | 'none'
  expiry_date: string
}

const INITIAL_BUYERS: BuyerItem[] = [
  {
    id: 'b-01',
    name: 'Marcus Sterling',
    email: 'm.sterling@sterlingapparel.com',
    company: 'Sterling Apparel Sourcing',
    country: 'United Kingdom',
    type: 'Sourcing Agent',
    verified: true,
    access_status: 'active',
    expiry_date: 'Dec 18, 2026',
  },
  {
    id: 'b-02',
    name: 'Elena Rostova',
    email: 'elena@nordicresort.se',
    company: 'Nordic Resortwear',
    country: 'Sweden',
    type: 'Retailer',
    verified: true,
    access_status: 'active',
    expiry_date: 'Dec 15, 2026',
  },
  {
    id: 'b-03',
    name: 'Kavita Mehta',
    email: 'kavita@vedacollective.com.au',
    company: 'Veda Collective',
    country: 'Australia',
    type: 'Private Label',
    verified: true,
    access_status: 'active',
    expiry_date: 'Dec 10, 2026',
  },
  {
    id: 'b-04',
    name: 'Julian Hayes',
    email: 'j.hayes@hayesboutique.com',
    company: 'Hayes Resortwear Miami',
    country: 'United States',
    type: 'Fashion Brand',
    verified: true,
    access_status: 'expired',
    expiry_date: 'Oct 28, 2026',
  },
]

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = useState<BuyerItem[]>(INITIAL_BUYERS)
  const [search, setSearch] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleGrant = (id: string) => {
    setBuyers(
      buyers.map((b) =>
        b.id === id
          ? { ...b, access_status: 'active', expiry_date: 'Dec 31, 2026' }
          : b
      )
    )
    setFeedback(`Showroom access granted to buyer ${id}.`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleRevoke = (id: string) => {
    setBuyers(
      buyers.map((b) => (b.id === id ? { ...b, access_status: 'revoked' } : b))
    )
    setFeedback(`Showroom access revoked for buyer ${id}.`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleExtend = (id: string) => {
    setBuyers(
      buyers.map((b) =>
        b.id === id
          ? { ...b, access_status: 'active', expiry_date: 'Jan 30, 2027' }
          : b
      )
    )
    setFeedback(`Access extended for +30 days for buyer ${id}.`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const filtered = buyers.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.company.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
          Accounts & Permissions
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
          Registered Fashion Buyers
        </h1>
        <p className="text-xs text-[#5C5A54] mt-1">
          Manage buyer profiles, active session durations, and individual showroom revocation.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-[#FEFCF8] p-4 border border-[#35332F]/10 flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7A6555] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by buyer name, company, email..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F5F1E9] border border-[#35332F]/20 text-xs outline-none"
          />
        </div>
        <p className="text-xs text-[#7A6555]">
          Total Verified Buyers: {buyers.filter((b) => b.verified).length}
        </p>
      </div>

      {/* Buyers Table */}
      <div className="bg-[#FEFCF8] border border-[#35332F]/10 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EFE9DF] border-b border-[#35332F]/10 text-[#35332F] uppercase tracking-wider text-[11px]">
              <th className="p-4">Buyer Name</th>
              <th className="p-4">Brand / Company</th>
              <th className="p-4">Territory</th>
              <th className="p-4">Business Classification</th>
              <th className="p-4">Email Verification</th>
              <th className="p-4">Access Status</th>
              <th className="p-4">Access Valid Until</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#35332F]/5">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                <td className="p-4">
                  <p className="font-medium text-[#35332F]">{b.name}</p>
                  <p className="text-[11px] text-[#7A6555] font-mono">{b.email}</p>
                </td>
                <td className="p-4 font-medium text-[#35332F]">{b.company}</td>
                <td className="p-4 text-[#5C5A54]">{b.country}</td>
                <td className="p-4 text-[#5C5A54]">{b.type}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      b.access_status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : b.access_status === 'expired'
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {b.access_status}
                  </span>
                </td>
                <td className="p-4 text-[#7A6555]">{b.expiry_date}</td>
                <td className="p-4 text-right space-x-2">
                  {b.access_status === 'active' ? (
                    <>
                      <button
                        onClick={() => handleExtend(b.id)}
                        className="text-[11px] text-[#70745C] hover:text-[#35332F] underline"
                      >
                        Extend (+30d)
                      </button>
                      <button
                        onClick={() => handleRevoke(b.id)}
                        className="text-[11px] text-red-600 hover:text-red-800 underline"
                      >
                        Revoke
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleGrant(b.id)}
                      className="text-[11px] text-[#35332F] hover:text-[#7A6555] underline font-semibold"
                    >
                      Grant Access
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
