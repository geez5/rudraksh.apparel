'use client'

import React, { useState } from 'react'
import { Product } from '@/types'
import { CheckCircle2, ShieldCheck, Mail, ArrowUpRight, X, AlertCircle } from 'lucide-react'

interface ProductDetailViewProps {
  product: Product
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const images = product.images && product.images.length > 0
    ? product.images
    : [
        {
          id: 'def-1',
          product_id: product.id,
          storage_path: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
          alt_text: product.name,
          image_type: 'front' as const,
          sort_order: 1,
          created_at: new Date().toISOString(),
        },
      ]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Enquiry form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    requested_quantity: '100 pcs',
    message: `Hi, I would like to request fabric swatches, pricing ladders, and sampling lead times for SKU: ${product.sku} (${product.name}).`,
  })

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          country: formState.country,
          product_id: `${product.sku} - ${product.name}`,
          requested_quantity: formState.requested_quantity,
          message: formState.message,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry')
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const activeImage = images[activeImageIndex] || images[0]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* =========================================
          LEFT: MULTI-IMAGE GALLERY
      ========================================= */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main High-Res Viewer */}
        <div className="relative aspect-[3/4] w-full bg-[#D8C7B1]/20 overflow-hidden border border-[#35332F]/10">
          <img
            src={activeImage.storage_path}
            alt={activeImage.alt_text || product.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
          <div className="absolute top-4 left-4 bg-[#F5F1E9]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#35332F]">
            {activeImage.image_type} angle
          </div>
        </div>

        {/* Thumbnail Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[3/4] w-20 overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#35332F] ring-1 ring-[#35332F]'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.storage_path}
                  alt={img.alt_text || `Angle ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================
          RIGHT: SPECIFICATIONS & ENQUIRY CTA
      ========================================= */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#7A6555] font-sans">
            <span>SKU: {product.sku}</span>
            {product.category && (
              <span className="text-[#70745C] font-semibold">{product.category.name}</span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#35332F] mt-2 leading-tight">
            {product.name}
          </h1>
        </div>

        {product.description && (
          <p className="text-sm text-[#5C5A54] leading-relaxed font-sans">
            {product.description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.tags.map((t) => (
              <span
                key={t.id}
                className="bg-[#EFE9DF] text-[#35332F] text-[10px] uppercase tracking-wider px-2.5 py-1 font-medium"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-[#35332F]/10" />

        {/* Technical Specification Matrix */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-[#70745C] font-semibold font-sans">
            Technical Specifications
          </h3>

          <div className="divide-y divide-[#35332F]/10 border-y border-[#35332F]/10 text-xs font-sans">
            {product.fabric && (
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#7A6555] uppercase tracking-wider">Fabric Construction</span>
                <span className="text-[#35332F] font-medium text-right">{product.fabric}</span>
              </div>
            )}

            {product.composition && (
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#7A6555] uppercase tracking-wider">Composition</span>
                <span className="text-[#35332F] font-medium text-right">{product.composition}</span>
              </div>
            )}

            {product.moq && (
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#7A6555] uppercase tracking-wider">Production MOQ</span>
                <span className="text-[#35332F] font-semibold text-right">{product.moq}</span>
              </div>
            )}

            {product.size_range && product.size_range.length > 0 && (
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#7A6555] uppercase tracking-wider">Grading Range</span>
                <span className="text-[#35332F] font-medium text-right">
                  {product.size_range.join(', ')}
                </span>
              </div>
            )}

            {product.colour_options && product.colour_options.length > 0 && (
              <div className="py-2.5 flex justify-between gap-4">
                <span className="text-[#7A6555] uppercase tracking-wider">Colorways</span>
                <span className="text-[#35332F] font-medium text-right">
                  {product.colour_options.join(' • ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Customization Note */}
        {product.customisation && (
          <div className="p-4 bg-[#FEFCF8] border border-[#35332F]/10 text-xs text-[#5C5A54] leading-relaxed">
            <span className="font-semibold text-[#35332F] uppercase tracking-wider block mb-1">
              Customisation Options:
            </span>
            {product.customisation}
          </div>
        )}

        {/* Request Action Button */}
        <div className="pt-4 space-y-3">
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false)
              setModalOpen(true)
            }}
            className="w-full bg-[#35332F] text-[#F5F1E9] py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Request Information & Quotation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-center text-[#7A6555]">
            Lead times, tech pack evaluations, and sample yardage confirmed within 24h.
          </p>
        </div>
      </div>

      {/* =========================================
          MODAL: REQUEST INFORMATION & TECH PACK
      ========================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#35332F]/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FEFCF8] max-w-lg w-full p-8 border border-[#35332F]/20 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#35332F]/60 hover:text-[#35332F] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#70745C] mx-auto" />
                <h3 className="font-serif text-2xl text-[#35332F]">Specification Request Received</h3>
                <p className="text-xs text-[#5C5A54] leading-relaxed">
                  Thank you. Your request for <strong>{product.name} ({product.sku})</strong> has been routed to our merchandising department. A confirmation has been emailed to you.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#35332F] text-[#F5F1E9] text-xs uppercase tracking-widest"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#70745C] font-semibold">
                    Product Enquiry • {product.sku}
                  </span>
                  <h3 className="font-serif text-2xl text-[#35332F] font-light mt-0.5">
                    Request Pricing & Sampling
                  </h3>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3 py-2 text-xs text-[#35332F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                      Business Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="buyer@brand.com"
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3 py-2 text-xs text-[#35332F] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                      Brand / Company *
                    </label>
                    <input
                      required
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="Label Co."
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3 py-2 text-xs text-[#35332F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                      Target Quantity
                    </label>
                    <input
                      type="text"
                      value={formState.requested_quantity}
                      onChange={(e) => setFormState({ ...formState, requested_quantity: e.target.value })}
                      placeholder="e.g. 100 pcs"
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3 py-2 text-xs text-[#35332F] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Country *
                  </label>
                  <input
                    required
                    type="text"
                    value={formState.country}
                    onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                    placeholder="e.g. United Kingdom"
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-3 py-2 text-xs text-[#35332F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Message / Specifications *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2 text-xs text-[#35332F] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#35332F] text-[#F5F1E9] py-3 text-xs font-semibold tracking-widest uppercase hover:bg-[#5C5A54] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Transmitting Request...' : 'Send Specification Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
