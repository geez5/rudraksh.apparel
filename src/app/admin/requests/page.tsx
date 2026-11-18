'use client'

import React, { useState } from 'react'
import { Inbox, Check, X, ShieldAlert, CheckCircle2, Clock } from 'lucide-react'

interface RequestItem {
  id: string
  name: string
  email: string
  company: string
  country: string
  business_type: string
  status: 'pending' | 'email_verified' | 'approved' | 'rejected'
  message?: string
  date: string
}

const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-01',
    name: 'Sarah Jenkins',
    email: 'sarah@ateliermarais.fr',
    company: 'Atelier Marais Paris',
    country: 'France',
    business_type: 'Fashion Brand',
    status: 'pending',
    message: 'We are launching our Spring 2027 resort line and seeking GOTS cotton block print dress manufacturing.',
    date: 'Today, 11:20 AM',
  },
  {
    id: 'req-02',
    name: 'David Thorne',
    email: 'd.thorne@thorneapparel.co.uk',
    company: 'Thorne Apparel London',
    country: 'United Kingdom',
    business_type: 'Wholesaler',
    status: 'email_verified',
    message: 'Looking for tailored linen shirts and relaxed co-ords for our wholesale multi-brand accounts.',
    date: 'Yesterday, 04:45 PM',
  },
  {
    id: 'req-03',
    name: 'Elena Rostova',
    email: 'elena@nordicresort.se',
    company: 'Nordic Resortwear',
    country: 'Sweden',
    business_type: 'Retailer',
    status: 'approved',
    date: 'Nov 16, 2026',
  },
  {
    id: 'req-04',
    name: 'Unknown Agent',
    email: 'generic_test@gmail.com',
    company: 'Personal Inquiry',
    country: 'Unknown',
    business_type: 'Other',
    status: 'rejected',
    date: 'Nov 14, 2026',
  },
]

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS)
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'email_verified' | 'approved' | 'rejected'>('all')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    )
    setFeedback(`Request ${id} approved. Showroom access email dispatched.`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleReject = (id: string) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    )
    setFeedback(`Request ${id} marked as rejected.`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const filtered = requests.filter((r) => {
    if (activeFilter === 'all') return true
    return r.status === activeFilter
  })

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
          Access Control
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
          Catalogue Access Applications
        </h1>
        <p className="text-xs text-[#5C5A54] mt-1">
          Review buyer applications before granting access to confidential line sheets.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#35332F]/10 pb-4 overflow-x-auto">
        {(['all', 'pending', 'email_verified', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeFilter === tab
                ? 'bg-[#35332F] text-white'
                : 'text-[#7A6555] hover:text-[#35332F] bg-[#FEFCF8]'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="bg-[#FEFCF8] border border-[#35332F]/10 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EFE9DF] border-b border-[#35332F]/10 text-[#35332F] uppercase tracking-wider text-[11px]">
              <th className="p-4">Applicant</th>
              <th className="p-4">Company & Country</th>
              <th className="p-4">Business Type</th>
              <th className="p-4">Submitted Date</th>
              <th className="p-4">Application Notes</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#35332F]/5">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                <td className="p-4">
                  <p className="font-medium text-[#35332F]">{r.name}</p>
                  <p className="text-[11px] text-[#7A6555] font-mono">{r.email}</p>
                </td>
                <td className="p-4">
                  <p className="text-[#35332F] font-medium">{r.company}</p>
                  <p className="text-[11px] text-[#5C5A54]">{r.country}</p>
                </td>
                <td className="p-4 text-[#5C5A54]">{r.business_type}</td>
                <td className="p-4 text-[#7A6555]">{r.date}</td>
                <td className="p-4 text-[#5C5A54] max-w-xs truncate">{r.message || '—'}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      r.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : r.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : r.status === 'email_verified'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {r.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {r.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="inline-flex items-center gap-1 bg-[#70745C] text-white px-3 py-1 text-[11px] font-medium uppercase tracking-wider hover:bg-[#545740]"
                    >
                      <Check className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      onClick={() => handleReject(r.id)}
                      className="inline-flex items-center gap-1 border border-red-300 text-red-700 px-3 py-1 text-[11px] uppercase tracking-wider hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                      <span>Reject</span>
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
