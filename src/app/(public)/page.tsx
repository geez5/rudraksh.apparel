import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Scissors, Layers, Globe, Compass, ArrowRight } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/products'
import { ProductCard } from '@/components/products/product-card'
import { CategoryCard } from '@/components/products/category-card'

export const metadata = {
  title: 'RUDRAKSH — Thoughtfully Crafted Womenswear. Made for the World.',
  description:
    'Premier Indian womenswear apparel manufacturer, garment exporter, and sourcing partner for international fashion brands, private labels and retailers.',
}

export default async function HomePage() {
  const categories = await getCategories()
  const featuredProducts = await getProducts({ featured: true, publicPreviewOnly: true })

  return (
    <div className="flex flex-col">
      {/* ========================================================
          SECTION 1: HERO
      ======================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#35332F] text-[#F5F1E9] overflow-hidden -mt-20 sm:-mt-24">
        {/* Editorial Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2000"
            alt="Editorial Womenswear Collection - Rudraksh"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform motion-safe:animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#35332F]/90 via-[#35332F]/70 to-[#35332F]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 text-center flex flex-col items-center">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 border border-[#D8C7B1]/40 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8C7B1]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
              B2B Apparel Manufacturing & Export • India
            </span>
          </div>

          {/* Master Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.08] tracking-tight max-w-5xl mb-6 text-balanced">
            Thoughtfully Crafted Womenswear. <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D8C7B1]">Made for the World.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-[#F5F1E9]/85 font-sans font-light leading-relaxed mb-10 text-balanced">
            Partnering with global fashion houses, boutique retailers, and private labels to deliver precision garment development, ethical fabric sourcing, and export-grade production.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link
              href="/capabilities"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D8C7B1] text-[#35332F] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalogue-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#F5F1E9]/40 text-[#F5F1E9] px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              <span>Request Digital Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero Credentials Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-left">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D8C7B1]">Specialization</p>
              <p className="font-serif text-lg text-white mt-1">Womenswear & Resort</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D8C7B1]">Textile Heritage</p>
              <p className="font-serif text-lg text-white mt-1">Block Print & Natural Fibers</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D8C7B1]">Production</p>
              <p className="font-serif text-lg text-white mt-1">Full Package & Sampling</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#D8C7B1]">Worldwide Export</p>
              <p className="font-serif text-lg text-white mt-1">Air & Sea Freight Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: COMPANY INTRODUCTION
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
                About The House of Rudraksh
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                An India-based manufacturing & sourcing alliance for international fashion.
              </h2>
              <div className="w-16 h-[1.5px] bg-[#A18A73]" />
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#5C5A54] font-sans leading-relaxed text-base sm:text-lg">
              <p>
                RUDRAKSH bridges India’s rich textile artisanal legacy with the rigorous standards of modern international apparel brands. We operate as an integrated production partner—not just a factory—collaborating from initial sketch and fabric selection through to precision fit sampling, grading, quality assurance, and export logistics.
              </p>
              <p className="text-base text-[#35332F]/80">
                Whether you are an established retailer requiring compliant volume manufacturing or an independent fashion label launching capsule collections, our infrastructure delivers bespoke women’s apparel with transparent communication and obsessive attention to detail.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#35332F] border-b border-[#35332F] pb-1 hover:text-[#7A6555] hover:border-[#7A6555] transition-colors"
                >
                  <span>Read our manufacturing philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: PRODUCT CATEGORIES
      ======================================================== */}
      <section className="py-24 bg-[#EFE9DF] border-t border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
                Our Taxonomy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Crafted Across Core Silhouettes
              </h2>
              <p className="text-sm text-[#5C5A54] font-sans">
                Explore our primary manufacturing product lines. Block print is both an artisanal category and an available technique across dresses, shirts, and sets.
              </p>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] hover:text-[#7A6555] transition-colors shrink-0"
            >
              <span>Explore All Collections</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <CategoryCard key={cat.id} category={cat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: MANUFACTURING CAPABILITIES
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              End-to-End Execution
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
              Comprehensive Apparel Capabilities
            </h2>
            <p className="text-sm sm:text-base text-[#5C5A54] font-sans">
              From creative sampling to high-precision batch cutting and compliant packaging, we handle each stage with documented protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Capability 1 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <Scissors className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Sampling & Pattern Making
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                Rapid physical prototypes from technical packs or digital CADs. Fit corrections, size grading from UK 6 to 22 / US 2 to 18, and pre-production approval samples.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Ethical Fabric Sourcing
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                Direct access to Indian mill-spun and hand-spun weaves: organic cotton cambric, mulmul, flax linen, poplins, khadi, and sustainable viscose blends.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Artisanal Techniques
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                Master craftsmen specializing in carved wooden block printing (Sanganeri, Bagru, Dabu), kantha linear quilting, pin-tucking, and delicate thread embroidery.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Rigorous Quality Assurance
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                AQL 2.5 standard inspections covering stitch tension, measurement tolerances, colorfastness rub tests, shrinkage testing, and needle detection.
              </p>
            </div>

            {/* Capability 5 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Private Label Customization
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                Woven neck labels, recycled swing tags, organic cotton care labels, branded polybags, custom barcoding, and bespoke trim sourcing.
              </p>
            </div>

            {/* Capability 6 */}
            <div className="p-8 bg-[#FEFCF8] border border-[#35332F]/10 space-y-4 hover:border-[#A18A73] transition-colors">
              <div className="w-12 h-12 bg-[#F5F1E9] flex items-center justify-center text-[#70745C]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-normal">
                Export & Freight Coordination
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] font-sans leading-relaxed">
                FOB / CIF / DDP export documentation, customs clearance assistance, air express shipping (DHL/FedEx) or sea container consolidation from Indian ports.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors"
            >
              <span>Explore Detailed Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: CRAFTSMANSHIP
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#35332F] text-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Mosaic */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800"
                  alt="Traditional Woodblock Printing"
                  className="w-full aspect-[3/4] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"
                  alt="Quilted Cotton Texture"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
                  alt="Pure Linen Weave"
                  className="w-full aspect-[4/3] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800"
                  alt="Handcrafted Garment Construction"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>

            {/* Storytelling Text */}
            <div className="space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
                Textile Artistry & Construction
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
                Honoring Indian Craftsmanship with Modern Industrial Precision.
              </h2>
              <div className="w-16 h-[1px] bg-[#A18A73]" />

              <p className="text-sm sm:text-base text-[#D8C7B1]/85 font-sans leading-relaxed">
                True luxury in garment manufacturing lies in texture, breathability, and the hand of the maker. At Rudraksh, we specialize in marrying centuries-old hand-block printing techniques from Rajasthan with precision-engineered sewing lines.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-[#D8C7B1]/40 flex items-center justify-center shrink-0 text-[#D8C7B1] text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Hand-Carved Teakwood Blocks</h4>
                    <p className="text-xs text-[#D8C7B1]/75 font-sans mt-0.5">
                      Each floral or geometric print is struck by hand, producing organic variations that machine rollers cannot replicate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-[#D8C7B1]/40 flex items-center justify-center shrink-0 text-[#D8C7B1] text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Artisanal Kantha & Straight Quilting</h4>
                    <p className="text-xs text-[#D8C7B1]/75 font-sans mt-0.5">
                      Natural cotton batting sandwiched between twin layers of breathable cotton, producing lightweight outerwear for trans-seasonal layering.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full border border-[#D8C7B1]/40 flex items-center justify-center shrink-0 text-[#D8C7B1] text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Vegetable & Low-Impact AZO-Free Dyes</h4>
                    <p className="text-xs text-[#D8C7B1]/75 font-sans mt-0.5">
                      Committed to export dye safety standards, ensuring colorfastness, gentle skin contact, and reduced environmental footprint.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/craftsmanship"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#D8C7B1] border-b border-[#D8C7B1] pb-1 hover:text-white hover:border-white transition-colors"
                >
                  <span>Explore Our Craftsmanship Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: FEATURED COLLECTION
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
                Curated Previews
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Featured Sample Silhouettes
              </h2>
              <p className="text-sm text-[#5C5A54] font-sans">
                A preview of sample garments developed for international buyers. For full technical tech packs and complete line access, request private showroom credentials.
              </p>
            </div>
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors shrink-0"
            >
              <span>Unlock Full Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: OUR PROCESS
      ======================================================== */}
      <section className="py-24 bg-[#EFE9DF] border-y border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              Predictable Delivery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#35332F]">
              The 7-Stage Manufacturing Process
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5A54] font-sans">
              Structured workflow ensuring design fidelity, fit accuracy, and punctual vessel/flight dispatch.
            </p>
          </div>

          {/* Process Timeline Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { step: '01', title: 'Concept & Brief', desc: 'Tech packs, moodboards or reference samples review' },
              { step: '02', title: 'Fabric Sourcing', desc: 'Mill lab dips, yarn swatches & organic sourcing' },
              { step: '03', title: 'Sampling & Fit', desc: 'Master proto cutting, grading & fit approvals' },
              { step: '04', title: 'Production', desc: 'Batch printing, precision cutting & line assembly' },
              { step: '05', title: 'Quality Control', desc: 'AQL 2.5 inline & end-of-line audits' },
              { step: '06', title: 'Custom Packaging', desc: 'Branded labelling, barcode tags & poly-bagging' },
              { step: '07', title: 'Global Export', desc: 'Air freight or sea container customs clearance' },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="bg-[#FEFCF8] p-5 border border-[#35332F]/10 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-xs font-serif font-bold text-[#A18A73] block">{p.step}</span>
                  <h4 className="font-serif text-lg text-[#35332F] font-normal mt-1 leading-snug">{p.title}</h4>
                </div>
                <p className="text-[11px] text-[#5C5A54] font-sans leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: WHY RUDRAKSH
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
                Partnership Value
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Why International Fashion Buyers Choose Us.
              </h2>
              <p className="text-sm sm:text-base text-[#5C5A54] font-sans leading-relaxed">
                We understand the commercial realities of fashion labels: accurate grading, punctual delivery windows, reliable fabric colorfastness, and transparent communication.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors"
                >
                  <span>Start A Partnership Discussion</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#FEFCF8] border border-[#35332F]/10 space-y-3">
                <CheckCircle2 className="w-5 h-5 text-[#70745C]" />
                <h4 className="font-serif text-xl text-[#35332F]">Low MOQ Flexibility</h4>
                <p className="text-xs text-[#5C5A54] leading-relaxed">
                  Supportive minimum order quantities (from 60–100 pieces per style) allowing independent brands to test new collections without prohibitive inventory burden.
                </p>
              </div>

              <div className="p-6 bg-[#FEFCF8] border border-[#35332F]/10 space-y-3">
                <CheckCircle2 className="w-5 h-5 text-[#70745C]" />
                <h4 className="font-serif text-xl text-[#35332F]">Direct Mill Sourcing</h4>
                <p className="text-xs text-[#5C5A54] leading-relaxed">
                  Direct relationships with textile weavers across India, eliminating intermediary markups and ensuring genuine yarn compositions.
                </p>
              </div>

              <div className="p-6 bg-[#FEFCF8] border border-[#35332F]/10 space-y-3">
                <CheckCircle2 className="w-5 h-5 text-[#70745C]" />
                <h4 className="font-serif text-xl text-[#35332F]">Private Label Customization</h4>
                <p className="text-xs text-[#5C5A54] leading-relaxed">
                  Complete white-label execution: branded neck tags, wash care labels, custom packaging, hang tags, and custom embroidery.
                </p>
              </div>

              <div className="p-6 bg-[#FEFCF8] border border-[#35332F]/10 space-y-3">
                <CheckCircle2 className="w-5 h-5 text-[#70745C]" />
                <h4 className="font-serif text-xl text-[#35332F]">Export Compliance</h4>
                <p className="text-xs text-[#5C5A54] leading-relaxed">
                  Strict adherence to international textile safety, AZO-free dye standards, ethical worker conditions, and accurate customs HS code classification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: PRIVATE CATALOGUE ACCESS CTA
      ======================================================== */}
      <section className="py-24 bg-[#35332F] text-[#F5F1E9] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8 relative z-10">
          <span className="text-xs tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
            Confidential B2B Showroom
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight text-balanced">
            Request Verified Access to Our Complete Digital Garment Catalogue.
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#D8C7B1]/85 font-sans leading-relaxed text-balanced">
            To protect our client brand partnerships and proprietary design patterns, our complete seasonal line sheets, fabric swatches, and wholesale quotation tiers are reserved for verified fashion buyers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/catalogue-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D8C7B1] text-[#35332F] px-9 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-md"
            >
              <span>Submit Access Application</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-9 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
            >
              <span>Speak to Sourcing Director</span>
            </Link>
          </div>

          <p className="text-[11px] text-[#D8C7B1]/60 tracking-wider font-sans">
            Verification typically processed within 24 hours. Instant automated access available for verified business emails.
          </p>
        </div>
      </section>
    </div>
  )
}
