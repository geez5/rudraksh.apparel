'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { catalogueRequestSchema, CatalogueRequestInput } from '@/lib/validation/schemas'
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, AlertCircle, Mail, ExternalLink } from 'lucide-react'

export default function CatalogueRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [devVerificationUrl, setDevVerificationUrl] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CatalogueRequestInput>({
    resolver: zodResolver(catalogueRequestSchema),
    defaultValues: {
      business_type: 'fashion_brand',
      consent: true,
      privacy_policy: true,
    },
  })

  const onSubmit = async (data: CatalogueRequestInput) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/catalogue-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit request')
      }

      setSubmitSuccess(true)
      if (json.dev_verification_url) {
        setDevVerificationUrl(json.dev_verification_url)
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please check your inputs.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Private B2B Showroom Application</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              Request Full Catalogue & Line Sheet Access.
            </h1>
            <p className="text-base text-[#5C5A54] font-sans leading-relaxed">
              To protect design originality and confidential client partnerships, our complete digital garment catalogue is reserved for verified fashion brands, buyers, and sourcing professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Context Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
                  What You Receive
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#35332F]">
                  Inside the Digital Showroom
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#5C5A54] font-sans">
                <div className="flex items-start gap-3 p-4 bg-[#FEFCF8] border border-[#35332F]/10">
                  <ShieldCheck className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#35332F]">High-Resolution Product Archives</h4>
                    <p className="text-xs text-[#5C5A54] mt-0.5">
                      Explore multi-angle photography: front, back, interior seam construction, and textile macro details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#FEFCF8] border border-[#35332F]/10">
                  <ShieldCheck className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#35332F]">Technical Specifications</h4>
                    <p className="text-xs text-[#5C5A54] mt-0.5">
                      Exact fabric compositions, yarn counts, stitch specifications, size run charts, and MOQ thresholds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#FEFCF8] border border-[#35332F]/10">
                  <ShieldCheck className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base text-[#35332F]">Direct Line Enquiry Tools</h4>
                    <p className="text-xs text-[#5C5A54] mt-0.5">
                      One-click specification requests and quote requests directly linked to specific sample SKUs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#35332F] text-[#F5F1E9] space-y-2">
                <p className="text-xs tracking-widest uppercase text-[#D8C7B1]">Verification Process</p>
                <p className="text-xs text-[#D8C7B1]/80 leading-relaxed">
                  Upon submitting this form, you will receive an email verification link. Once verified, access is granted either automatically or following brief review depending on our current regional capacity.
                </p>
              </div>
            </div>

            {/* Form Container */}
            <div className="lg:col-span-7 bg-[#FEFCF8] p-8 sm:p-12 border border-[#35332F]/10">
              {submitSuccess ? (
                <div className="py-12 px-6 text-center space-y-6 animate-in fade-in">
                  <div className="w-16 h-16 bg-[#F5F1E9] border border-[#70745C]/40 rounded-full flex items-center justify-center text-[#70745C] mx-auto">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#35332F] font-light">
                    Verification Email Dispatched
                  </h3>
                  <p className="text-sm text-[#5C5A54] max-w-md mx-auto leading-relaxed">
                    We have sent a secure verification link to your registered email address. Please click the link to verify your business email and access the private catalogue.
                  </p>

                  {/* Dev-mode helper */}
                  {devVerificationUrl && (
                    <div className="p-5 bg-[#F5F1E9] border border-[#D8C7B1] text-left space-y-3 max-w-lg mx-auto">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A6555]">
                        <CheckCircle2 className="w-4 h-4 text-[#70745C]" />
                        <span>Development Verification Shortcut:</span>
                      </div>
                      <p className="text-xs text-[#5C5A54]">
                        Transactional email credentials (Resend) are not configured yet, so you can verify immediately via this link:
                      </p>
                      <a
                        href={devVerificationUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#35332F] underline hover:text-[#7A6555] break-all"
                      >
                        <span>Click here to complete verification</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  )}

                  <div className="pt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#35332F] hover:text-[#7A6555]"
                    >
                      <span>Return to Homepage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#35332F] font-light">
                      Buyer Registration
                    </h3>
                    <p className="text-xs text-[#5C5A54] mt-1">
                      All fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('full_name')}
                        placeholder="e.g. Chloe Bennett"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                      />
                      {errors.full_name && (
                        <p className="text-[11px] text-red-600">{errors.full_name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="chloe@labelstudio.co.uk"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        {...register('company_name')}
                        placeholder="e.g. Bennett Resortwear"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                      />
                      {errors.company_name && (
                        <p className="text-[11px] text-red-600">{errors.company_name.message}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Country / Territory *
                      </label>
                      <input
                        type="text"
                        {...register('country')}
                        placeholder="e.g. United Kingdom, Australia, USA..."
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                      />
                      {errors.country && (
                        <p className="text-[11px] text-red-600">{errors.country.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                      Business Type *
                    </label>
                    <select
                      {...register('business_type')}
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                    >
                      <option value="fashion_brand">Fashion Brand / Label</option>
                      <option value="retailer">Retailer (Multi-brand Boutique or Chain)</option>
                      <option value="wholesaler">Clothing Wholesaler</option>
                      <option value="distributor">Apparel Distributor</option>
                      <option value="sourcing_agent">Apparel Sourcing Agency</option>
                      <option value="private_label">Private Label Business</option>
                      <option value="other">Fashion Entrepreneur / Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                      Sourcing Requirements or Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      {...register('message')}
                      placeholder="Tell us about the categories you are interested in (e.g. block print dresses, linen co-ords, quilted jackets)..."
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-4 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('consent')}
                        className="mt-1 accent-[#35332F]"
                      />
                      <span className="text-xs text-[#5C5A54] leading-relaxed">
                        I consent to receive business-related communications and digital line sheets from RUDRAKSH. *
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-red-600">{errors.consent.message}</p>
                    )}

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('privacy_policy')}
                        className="mt-1 accent-[#35332F]"
                      />
                      <span className="text-xs text-[#5C5A54] leading-relaxed">
                        I understand that digital catalogue materials are confidential and agree to the privacy terms. *
                      </span>
                    </label>
                    {errors.privacy_policy && (
                      <p className="text-[11px] text-red-600">{errors.privacy_policy.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#35332F] text-[#F5F1E9] py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Verifying Details...' : 'Submit Application & Send Verification Link'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
