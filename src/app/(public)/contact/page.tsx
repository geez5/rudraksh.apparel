'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactInput } from '@/lib/validation/schemas'
import { siteConfig } from '@/config/site'
import { Mail, MapPin, Phone, MessageSquare, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiry_type: 'Custom Garment Manufacturing',
    },
  })

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit enquiry')
      }

      setSubmitSuccess(true)
      reset()
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Header */}
      <section className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              B2B Communication
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#35332F] leading-tight">
              Initiate a Sourcing Dialogue.
            </h1>
            <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed pt-2">
              Whether you are preparing a seasonal collection tech pack or seeking organic fabric sourcing in India, our team responds to qualified inquiries promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Contact Info */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-3xl font-light text-[#35332F]">
                  Atelier & Manufacturing Operations
                </h2>
                <p className="text-sm text-[#5C5A54] leading-relaxed">
                  Headquartered in India with integrated weaving alliances, printing workshops, and export documentation offices.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex items-start gap-4 p-5 bg-[#FEFCF8] border border-[#35332F]/10">
                  <MapPin className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#35332F] font-semibold">
                      Location
                    </h4>
                    <p className="text-sm text-[#5C5A54] mt-1">
                      {siteConfig.contact.address || 'Apparel Export Cluster, India'}
                    </p>
                    <p className="text-xs text-[#7A6555] mt-0.5">Air/Sea consolidation via Mumbai & Delhi hubs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-[#FEFCF8] border border-[#35332F]/10">
                  <Mail className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#35332F] font-semibold">
                      Email Communication
                    </h4>
                    <p className="text-sm text-[#5C5A54] mt-1">
                      {siteConfig.contact.email || 'export@rudraksh.in'}
                    </p>
                    <p className="text-xs text-[#7A6555] mt-0.5">Mon–Sat: 09:00 – 19:00 IST</p>
                  </div>
                </div>

                {siteConfig.contact.phone && (
                  <div className="flex items-start gap-4 p-5 bg-[#FEFCF8] border border-[#35332F]/10">
                    <Phone className="w-5 h-5 text-[#70745C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#35332F] font-semibold">
                        Direct Desk
                      </h4>
                      <p className="text-sm text-[#5C5A54] mt-1">{siteConfig.contact.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Showroom CTA Box */}
              <div className="p-6 bg-[#35332F] text-[#F5F1E9] space-y-3">
                <h4 className="font-serif text-xl font-light text-white">
                  Looking for the Private Catalogue?
                </h4>
                <p className="text-xs text-[#D8C7B1]/80 leading-relaxed">
                  If you are a fashion brand or buyer wanting immediate access to line sheets and specs, apply for our showroom credentials.
                </p>
                <div className="pt-2">
                  <a
                    href="/catalogue-request"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#D8C7B1] hover:text-white transition-colors"
                  >
                    <span>Go to Catalogue Application</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#FEFCF8] p-8 sm:p-12 border border-[#35332F]/10">
              <div className="mb-8 space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F] font-light">
                  Submit Business Enquiry
                </h3>
                <p className="text-xs text-[#5C5A54]">
                  Please provide details about your garment requirements, target quantities, or fabric preferences.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-8 bg-[#F5F1E9] border border-[#70745C]/30 text-center space-y-4 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#70745C] mx-auto" />
                  <h4 className="font-serif text-2xl text-[#35332F]">Enquiry Transmitted</h4>
                  <p className="text-sm text-[#5C5A54] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. We have logged your enquiry and our production director will review your requirements. A confirmation email has been dispatched.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#35332F] text-[#F5F1E9] text-xs uppercase tracking-widest font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-600">{errors.name.message}</p>
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
                        placeholder="eleanor@fashionbrand.com"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        {...register('company')}
                        placeholder="e.g. Vance Studios London"
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none transition-colors"
                      />
                    </div>

                    {/* Enquiry Type */}
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                        Enquiry Nature *
                      </label>
                      <select
                        {...register('enquiry_type')}
                        className="w-full bg-[#F5F1E9] border border-[#35332F]/20 px-4 py-3 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none transition-colors"
                      >
                        <option value="Custom Garment Manufacturing">Custom Garment Manufacturing</option>
                        <option value="Sampling & Fit Prototyping">Sampling & Fit Prototyping</option>
                        <option value="Fabric & Mill Sourcing">Fabric & Mill Sourcing</option>
                        <option value="Hand Block Printing Program">Hand Block Printing Program</option>
                        <option value="Quilted Outerwear Production">Quilted Outerwear Production</option>
                        <option value="Other Sourcing Enquiry">Other Sourcing Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#35332F] font-medium">
                      Project Details & Message *
                    </label>
                    <textarea
                      rows={5}
                      {...register('message')}
                      placeholder="Please mention your approximate quantities, timeline, fabric preferences, or reference garments..."
                      className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-4 text-sm text-[#35332F] focus:border-[#35332F] focus:bg-white outline-none transition-colors"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#35332F] text-[#F5F1E9] px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Enquiry...' : 'Send Business Enquiry'}
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
