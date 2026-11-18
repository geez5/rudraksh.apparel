import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Scissors, Layers, CheckCircle2, Box, Plane, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Manufacturing & Sourcing Capabilities | RUDRAKSH',
  description:
    'Comprehensive B2B apparel production capabilities: pattern drafting, sample development, ethical fabric sourcing, block printing, and export logistics.',
}

export default function CapabilitiesPage() {
  const capabilities = [
    {
      id: 'design-development',
      icon: Scissors,
      title: '1. Design & Pattern Development',
      subtitle: 'From Concept to Technical Blueprint',
      description:
        'We interpret buyer sketches, physical reference garments, or comprehensive tech packs. Our in-house master pattern makers translate design aesthetics into accurate paper patterns and digital CAD grading, ensuring silhouette fidelity across every Western sizing tier.',
      points: [
        'Tech pack evaluation & constructability audits',
        'Master pattern drafting for complex drapes and tailored cuts',
        'Size grading (UK 6–22 / US 2–18 / EU 34–50)',
        'Fabric yield optimization and consumption planning',
      ],
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=900',
    },
    {
      id: 'fabric-sourcing',
      icon: Layers,
      title: '2. Mill & Artisanal Fabric Sourcing',
      subtitle: 'Direct Weaving Alliances Across India',
      description:
        'India boasts the world’s most versatile cotton, linen, and artisanal textile ecosystems. We maintain direct relationships with spinning mills, organic co-operatives, and handloom clusters to source compliant, high-grade base fabrics.',
      points: [
        'Organic cotton cambric (40s, 60s, 80s count) & lightweight mulmul',
        'Pure European-grade flax linen & linen-cotton slub blends',
        'Structured cotton poplins, twills, and dobby textures',
        'AZO-free color matching, Pantone TPX lab dips, and shrinkage pre-wash tests',
      ],
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900',
    },
    {
      id: 'sampling',
      icon: Sparkles,
      title: '3. Precision Sampling & Fit Prototyping',
      subtitle: 'Rigorous Pre-Production Validation',
      description:
        'A dedicated sampling cell ensures you see and approve physical prototypes before cutting bulk fabric. We provide proto samples, fit correction samples, and sealed pre-production (PP) samples for buyer sign-off.',
      points: [
        'Rapid proto sample delivery within 10–14 working days',
        'Full size-set samples for fit testing on live fit models',
        'Embellishment and print strike-offs for color approval',
        'Technical feedback on seam durability and wash behavior',
      ],
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=900',
    },
    {
      id: 'production',
      icon: SlidersHorizontal,
      title: '4. Batch & Bulk Garment Production',
      subtitle: 'Flexible Lines for High-End Womenswear',
      description:
        'Our sewing lines are configured for delicate natural fabrics and complex construction details like French seams, bias binding, and gathers. We handle both small boutique capsules and recurring seasonal wholesale programs.',
      points: [
        'Low MOQ thresholds: starting from 60–100 pieces per style',
        'High stitch-per-inch (SPI 12–14) industrial lockstitch sewing',
        'Specialised machinery for pin-tucking, flatlock, and blind hem finishing',
        'Dedicated line supervision for print motif matching across plackets and seams',
      ],
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900',
    },
    {
      id: 'quality-assurance',
      icon: ShieldCheck,
      title: '5. Multi-Stage Quality Assurance',
      subtitle: 'AQL 2.5 Compliance Standards',
      description:
        'Quality is inspected at the yarn stage, during printing, along the sewing line, and at final carton packing. Every single garment is hand-inspected for loose threads, measurement variance, and symmetry.',
      points: [
        'AQL 2.5 inline and final random inspection protocols',
        'Strict 1cm measurement tolerance across all key grade points',
        'Wet & dry crocking (rubbing) fastness and wash-care testing',
        'Calibrated 9-point needle detection before boxing',
      ],
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=900',
    },
    {
      id: 'packaging-export',
      icon: Box,
      title: '6. Private Label Packaging & Export',
      subtitle: 'Retail-Ready Packaging & Seamless Dispatch',
      description:
        'Garments leave our facility completely labeled, steamed, and packaged according to your distributor requirements. We coordinate full customs clearance for smooth entry into international ports.',
      points: [
        'Woven brand labels, organic care tags & branded hangtags',
        'Individual eco-polybagging or biodegradable compostable bags',
        'FOB, CIF, or DDP shipping terms coordinated through DHL, FedEx or Ocean Lines',
        'Complete export documentation: Certificate of Origin, Commercial Invoice & Packing Lists',
      ],
      image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=900',
    },
  ]

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Page Header */}
      <section className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              Production Infrastructure
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#35332F] leading-tight">
              Manufacturing Capabilities & Sourcing Architecture.
            </h1>
            <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed pt-2">
              Explore how we translate high-fashion concepts into scalable, retail-ready garments with complete quality oversight at every production milestone.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Deep-Dive */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
          {capabilities.map((cap, idx) => {
            const isReversed = idx % 2 === 1
            const Icon = cap.icon
            return (
              <div
                key={cap.id}
                id={cap.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#35332F]/5 border border-[#35332F]/10">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#EFE9DF] border border-[#A18A73]/40 flex items-center justify-center text-[#70745C]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-[#70745C] font-semibold">
                      {cap.subtitle}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#35332F] leading-tight mt-1">
                      {cap.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#5C5A54] leading-relaxed">
                    {cap.description}
                  </p>

                  <div className="pt-2 space-y-2.5">
                    {cap.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#70745C] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#35332F]/80 font-sans">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#35332F] text-[#F5F1E9]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Ready to review technical specifications or sample a style?
          </h2>
          <p className="text-sm text-[#D8C7B1]/80 max-w-xl mx-auto font-sans">
            Our sampling department is prepared to review your tech pack or suggest fabric options for your target retail price points.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#D8C7B1] text-[#35332F] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors"
            >
              <span>Request Full Digital Line Sheet</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
            >
              <span>Submit A Tech Pack</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
