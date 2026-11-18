import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, ShieldCheck, HeartHandshake, Compass, Globe } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: 'About Our House | RUDRAKSH',
  description:
    'Learn about Rudraksh, an India-based womenswear apparel manufacturer, garment exporter, and sourcing partner for global fashion labels.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Editorial Header */}
      <section className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              Company Profile & Philosophy
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#35332F] leading-tight">
              A Trusted Bridge Between Indian Textile Heritage and Global Fashion.
            </h1>
            <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed pt-2">
              RUDRAKSH was established to provide international fashion brands, retailers, and private labels with a transparent, disciplined, and design-led apparel manufacturing partner in India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
                alt="Fashion Atelier and Garment Pattern Drafting"
                className="w-full aspect-[4/5] object-cover shadow-sm"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#35332F] text-[#F5F1E9] p-6 hidden sm:block max-w-xs">
                <p className="font-serif text-xl italic leading-snug">
                  "Manufacturing is not simply assembly—it is the materialisation of design intent."
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-[#5C5A54] font-sans text-base leading-relaxed">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
                Our Purpose
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#35332F] leading-tight">
                Quiet Luxury Crafted with Conscience and Precision.
              </h2>
              <p>
                The international fashion landscape demands partners who do not merely follow instructions, but understand fit nuances, Western sizing proportions, fabric drape, and the commercial pressures of seasonal release calendars.
              </p>
              <p>
                From our sourcing base in India, we work directly with master textile weavers, natural dye houses, and skilled pattern makers. Every garment passing through our lines is inspected under international AQL standards before being packed and documented for export.
              </p>
              <p>
                We do not make extravagant, unverified claims. We prioritize consistent stitch tension, genuine yarn compositions, predictable production lead times, and candid communication with our brand partners.
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <p className="font-serif text-2xl text-[#35332F]">B2B Partner</p>
                  <p className="text-xs text-[#7A6555] tracking-widest uppercase">Export Focused</p>
                </div>
                <div className="w-[1px] h-10 bg-[#35332F]/20" />
                <div>
                  <p className="font-serif text-2xl text-[#35332F]">Full-Package</p>
                  <p className="text-xs text-[#7A6555] tracking-widest uppercase">Sampling to Dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-20 bg-[#EFE9DF] border-y border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
              The Rudraksh Way
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#35332F]">
              Our Operating Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-xl text-[#35332F]">Material Authenticity</h3>
              <p className="text-xs text-[#5C5A54] leading-relaxed">
                We test yarn compositions, thread counts, and shrinkage before bulk cutting. What is on the tech pack is what enters production.
              </p>
            </div>

            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-xl text-[#35332F]">Artisan Respect</h3>
              <p className="text-xs text-[#5C5A54] leading-relaxed">
                Our block printers and hand embroiderers are compensated fairly, working in clean, well-lit environments with dignified safety standards.
              </p>
            </div>

            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-3">
              <Compass className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-xl text-[#35332F]">Disciplined Sampling</h3>
              <p className="text-xs text-[#5C5A54] leading-relaxed">
                A good production run begins with a flawless sample. We iterate until size specs, neckline curvature, and drape meet full approval.
              </p>
            </div>

            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-3">
              <Globe className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-xl text-[#35332F]">Export Readiness</h3>
              <p className="text-xs text-[#5C5A54] leading-relaxed">
                Familiarity with international customs classifications, packing ratios, barcode placements, and fumigation/air cargo protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#35332F]">
            Partner with Rudraksh for your upcoming season.
          </h2>
          <p className="text-sm text-[#5C5A54] max-w-xl mx-auto leading-relaxed">
            Send us your tech packs or discuss our private label development lines. Our sourcing team replies to qualified buyers within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors"
            >
              <span>Request Full Digital Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#35332F] text-[#35332F] px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#35332F] hover:text-[#F5F1E9] transition-colors"
            >
              <span>Send An Enquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
