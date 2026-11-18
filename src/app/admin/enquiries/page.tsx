'use client'

import React, { useState } from 'react'
import { MessageSquare, Download, CheckCircle2, Search, ArrowUpRight } from 'lucide-react'

interface EnquiryRecord {
  id: string
  name: string
  email: string
  company: string
  country: string
  product: string
  requested_quantity: string
  message: string
  status: 'new' | 'contacted' | 'in_discussion' | 'quoted' | 'closed'
  date: string
}

const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-001',
    name: 'Sarah Jenkins',
    email: 'sarah@ateliermarais.fr',
    company: 'Atelier Marais Paris',
    country: 'France',
    product: 'RDK-DRS-001 - Sanganeri Tiered Dress',
    requested_quantity: '150 pcs',
    message: 'We are requesting lab dips for Indigo colorway and sampling quotation with custom woven brand labels.',
    status: 'new',
    date: 'Nov 18, 2026',
  },
  {
    id: 'enq-002',
    name: 'Marcus Sterling',
    email: 'm.sterling@sterlingapparel.com',
    company: 'Sterling Sourcing UK',
    country: 'United Kingdom',
    product: 'RDK-JKT-002 - Reversible Quilted Jacket',
    requested_quantity: '200 pcs',
    message: 'Can this style be made with custom dyed cotton batting? Please provide pricing breakdown for 200 vs 500 pcs.',
    status: 'contacted',
    date: 'Nov 17, 2026',
  },
  {
    id: 'enq-003',
    name: 'Elena Rostova',
    email: 'elena@nordicresort.se',
    company: 'Nordic Resortwear',
    country: 'Sweden',
    product: 'RDK-CRD-003 - Linen Resort Co-ord',
    requested_quantity: '120 sets',
    message: 'Fit sample needed in size M with natural mother-of-pearl buttons. Target delivery in March.',
    status: 'in_discussion',
    date: 'Nov 15, 2026',
  },
  {
    id: 'enq-004',
    name: 'Julian Hayes',
    email: 'j.hayes@hayesboutique.com',
    company: 'Hayes Miami',
    country: 'USA',
    product: 'RDK-BLK-007 - Dabu Indigo Kaftan',
    requested_quantity: '80 pcs',
    message: 'Quotation sent for 80 units FOB Mumbai. Awaiting purchase order confirmation.',
    status: 'quoted',
    date: 'Nov 12, 2026',
  },
]

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(INITIAL_ENQUIRIES)
  const [search, setSearch] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleStatusChange = (id: string, newStatus: EnquiryRecord['status']) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    )
    setFeedback(`Enquiry ${id} status set to ${newStatus}`)
    setTimeout(() => setFeedback(null), 3000)
  }

  const exportCSV = () => {
    const headers = ['ID,Name,Email,Company,Country,Product,Quantity,Status,Date,Message\n']
    const rows = enquiries.map((e) =>
      `"${e.id}","${e.name}","${e.email}","${e.company}","${e.country}","${e.product}","${e.requested_quantity}","${e.status}","${e.date}","${e.message.replace(/"/g, '""')}"\n`
    )
    const blob = new Blob([headers.concat(rows).join('')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rudraksh_enquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.company.toLowerCase().includes(search.toLowerCase()) ||
      e.product.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
            Sales & Merchandising
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
            Buyer Line Enquiries & Quotations
          </h1>
          <p className="text-xs text-[#5C5A54] mt-1">
            Track inquiries, update deal stages, and export records for your sales pipeline.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#5C5A54] transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
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
            placeholder="Search enquiries by brand or product..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F5F1E9] border border-[#35332F]/20 text-xs outline-none"
          />
        </div>
        <p className="text-xs text-[#7A6555]">Total Enquiries: {enquiries.length}</p>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#FEFCF8] border border-[#35332F]/10 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EFE9DF] border-b border-[#35332F]/10 text-[#35332F] uppercase tracking-wider text-[11px]">
              <th className="p-4">Buyer & Brand</th>
              <th className="p-4">Target Garment Reference</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Message / Requirements</th>
              <th className="p-4">Received Date</th>
              <th className="p-4">Pipeline Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#35332F]/5">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                <td className="p-4">
                  <p className="font-medium text-[#35332F]">{e.name}</p>
                  <p className="text-[11px] text-[#7A6555]">{e.company} ({e.country})</p>
                  <p className="text-[10px] text-[#5C5A54] font-mono">{e.email}</p>
                </td>
                <td className="p-4 font-medium text-[#35332F] max-w-xs">{e.product}</td>
                <td className="p-4 font-semibold text-[#70745C]">{e.requested_quantity}</td>
                <td className="p-4 text-[#5C5A54] max-w-sm text-[11px] leading-relaxed">
                  {e.message}
                </td>
                <td className="p-4 text-[#7A6555]">{e.date}</td>
                <td className="p-4">
                  <select
                    value={e.status}
                    onChange={(ev) => handleStatusChange(e.id, ev.target.value as any)}
                    className="bg-[#F5F1E9] border border-[#35332F]/20 px-2 py-1 text-xs text-[#35332F] uppercase tracking-wider font-medium outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
