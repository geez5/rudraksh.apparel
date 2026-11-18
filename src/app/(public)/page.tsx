import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { getCategories } from '@/lib/products'

export const metadata = {
  title: 'RUDRAKSH — The art of making',
  description:
    'Women’s apparel manufacturing, export and sourcing, shaped by craftsmanship and contemporary design.',
}

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F] overflow-x-hidden -mt-20 sm:-mt-24">
      {/* ========================================================
          THE ART OF MAKING — COVER (HERO SECTION)
      ======================================================== */}
      <section className="relative min-h-[96vh] flex flex-col justify-between bg-[#35332F] text-[#F5F1E9] overflow-hidden pt-36 pb-12 px-6 sm:px-8 lg:px-12">
        {/* Cinematic Garment Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://framerusercontent.com/images/0Z15NAkSrmq92bFNnjOf7OTouws.png"
            alt="The art of making — Rudraksh"
            className="w-full h-full object-cover object-center opacity-45 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#35332F]/90 via-[#35332F]/50 to-[#35332F]/60" />
        </div>

        {/* Top spacer */}
        <div className="relative z-10" />

        {/* Cover Editorial Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 my-auto">
          {/* Eyebrow */}
          <div className="inline-block">
            <span className="text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
              INDIAN CRAFT. GLOBAL PERSPECTIVE.
            </span>
          </div>

          {/* Master Heading: "The art of" / "making." */}
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-normal text-white leading-[0.92] tracking-normal">
            <span className="block">The art of</span>
            <span className="block italic text-[#D8C7B1]">making.</span>
          </h1>

          {/* Cover Introduction */}
          <p className="max-w-xl text-base sm:text-lg text-[#F5F1E9]/85 font-sans font-light leading-relaxed pt-2">
            Women’s apparel manufacturing, export and sourcing, shaped by craftsmanship and contemporary design.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="#beginning"
              className="inline-flex items-center gap-3 border border-[#A18A73] bg-[#35332F]/40 backdrop-blur-xs text-[#F5F1E9] px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#F5F1E9] hover:text-[#35332F] hover:border-[#F5F1E9]"
            >
              <span>EXPLORE RUDRAKSH</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Edition Note Bar matching Framer */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-[#D8C7B1] font-sans">
          <span>RUDRAKSH / AN EXPLORATION IN CLOTH</span>
          <span>CRAFTED IN INDIA. CONSIDERED FOR THE WORLD.</span>
        </div>
      </section>

      {/* ========================================================
          01 / A CONSIDERED BEGINNING
      ======================================================== */}
      <section id="beginning" className="py-24 sm:py-36 bg-[#F5F1E9] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section index kicker */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium">
              01 / A CONSIDERED BEGINNING
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Big Headline */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#35332F] leading-[1.1]">
                Every garment begins long before it is worn.
              </h2>
            </div>

            {/* Right Story & Image */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6 text-[#5C5A54] font-sans text-base sm:text-lg leading-relaxed">
                <p className="font-serif text-2xl sm:text-3xl text-[#35332F] italic font-light leading-snug">
                  It begins with a feeling. A texture. A possibility.
                </p>
                <p>
                  Rudraksh brings Indian textile craftsmanship into conversation with contemporary womenswear. From the first fabric to the final silhouette, we approach making as both a creative practice and a considered partnership.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] border-b border-[#35332F] pb-1 hover:text-[#7A6555] hover:border-[#7A6555] transition-colors"
                  >
                    <span>DISCOVER OUR WORLD</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Editorial Photograph */}
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#D8C7B1]/20">
                <img
                  src="https://framerusercontent.com/images/X0GvzMI58bdKA5HXDxypymct4rg.png"
                  alt="A story in cloth"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          02 / THE COLLECTION
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#EAE2D6]/60 border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium">
                02 / THE COLLECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                A wardrobe of possibilities.
              </h2>
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 border border-[#A18A73] px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] hover:bg-[#35332F] hover:text-white transition-colors shrink-0"
            >
              <span>VIEW COLLECTIONS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Marquee Ticker */}
          <div className="py-4 border-y border-[#35332F]/10 mb-16 overflow-hidden whitespace-nowrap text-xs sm:text-sm tracking-[0.25em] uppercase text-[#7A6555] font-sans font-medium">
            <span>DRESSES / TOPS / CO-ORD SETS / SHIRTS / SKIRTS / BLOCK PRINT / QUILTED JACKETS</span>
          </div>

          {/* Asymmetric Collection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/collections?category=${cat.slug}`}
                className="group block space-y-4"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#35332F]/5 border border-[#35332F]/10">
                  <img
                    src={cat.image_path || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#F5F1E9]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-[#35332F]">
                    Chapter 0{idx + 1}
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <h3 className="font-serif text-2xl text-[#35332F] group-hover:text-[#7A6555] transition-colors font-light">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-[#7A6555] group-hover:translate-x-1 transition-transform">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          03 / THE LANGUAGE OF CLOTH
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#F5F1E9] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Imagery Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden bg-[#D8C7B1]/20">
                  <img
                    src="https://framerusercontent.com/images/R4nHwZ5IckVSyOzyvKHubRqgpg.png"
                    alt="Textile surface texture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="aspect-[3/4] overflow-hidden bg-[#D8C7B1]/20">
                  <img
                    src="https://framerusercontent.com/images/fAOiTgdkUZ1vqHW95kWixB2igs.png"
                    alt="Crafted garment silhouette"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Story */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium">
                03 / THE LANGUAGE OF CLOTH
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Some stories are better felt.
              </h2>
              <div className="w-16 h-[1px] bg-[#A18A73]" />

              <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed">
                The irregular rhythm of a printed motif. The quiet structure of a quilted surface. The fall of cloth against the body. Material is where our story takes shape.
              </p>

              <div className="py-4 border-t border-[#35332F]/10 text-xs tracking-[0.25em] uppercase text-[#7A6555] font-sans font-medium">
                TEXTURE / PRINT / STRUCTURE / MOVEMENT
              </div>

              <div className="pt-2">
                <Link
                  href="/craftsmanship"
                  className="inline-flex items-center gap-2 border border-[#35332F] px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] hover:bg-[#35332F] hover:text-white transition-colors"
                >
                  <span>Explore Craftsmanship</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          04 / THE ART OF MAKING (CAPABILITIES)
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#EAE2D6]/40 border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-4 max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium">
              04 / THE ART OF MAKING
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
              From thought to thread.
            </h2>
            <p className="text-sm sm:text-base text-[#5C5A54] font-sans leading-relaxed pt-1">
              A considered journey, shaped around your collection. Each stage is a conversation between creative intent and the practical details of making.
            </p>
          </div>

          {/* The 6 Framer Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { num: '01 / CONCEPT', desc: 'Begin with the direction, mood and silhouette.' },
              { num: '02 / SOURCING', desc: 'Explore the materials that bring the idea to life.' },
              { num: '03 / SAMPLING', desc: 'Refine proportion, construction and finish.' },
              { num: '04 / PRODUCTION', desc: 'Translate the approved direction into the collection.' },
              { num: '05 / QUALITY', desc: 'Consider the details, from construction to final presentation.' },
              { num: '06 / EXPORT', desc: 'Discuss the requirements of your market and delivery.' },
            ].map((st) => (
              <div
                key={st.num}
                className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-3 hover:border-[#A18A73] transition-colors"
              >
                <span className="text-xs tracking-[0.2em] font-sans font-bold text-[#A18A73] block">
                  {st.num}
                </span>
                <p className="text-sm sm:text-base text-[#35332F] font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 border border-[#35332F] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] hover:bg-[#35332F] hover:text-white transition-colors"
            >
              <span>Explore Detailed Capabilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          FULL-WIDTH STATEMENT BANNER
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#35332F] text-[#F5F1E9] text-center px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#D8C7B1] font-sans font-medium block">
            NOT JUST WHAT WE MAKE. HOW WE MAKE YOU FEEL.
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
            Rooted in craft. Open to the world.
          </h2>
        </div>
      </section>

      {/* ========================================================
          06 / SELECTED PERSPECTIVES (STUDIES IN SILHOUETTE)
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#F5F1E9] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="space-y-3 max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium">
              06 / SELECTED PERSPECTIVES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
              Studies in silhouette.
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6555] font-sans">
              An illustrative preview of the world we’re building. Not a live product catalogue.
            </p>
          </div>

          {/* Three Large Vertical Portrait Cards with Badges matching Framer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#35332F]/5 border border-[#35332F]/10">
                <img
                  src="https://framerusercontent.com/images/o1jxzf1wGB5SZZe8rNh5GgOnZg.png"
                  alt="The printed silhouette"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#F5F1E9]/95 backdrop-blur-xs px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold text-[#35332F] border border-[#35332F]/10">
                  ILLUSTRATIVE PREVIEW
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-light">
                The printed silhouette
              </h3>
            </div>

            {/* Card 2 */}
            <div className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#35332F]/5 border border-[#35332F]/10">
                <img
                  src="https://framerusercontent.com/images/TBs9biwNrC8Nk9Ej338Fh4NEvns.png"
                  alt="The relaxed ensemble"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#F5F1E9]/95 backdrop-blur-xs px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold text-[#35332F] border border-[#35332F]/10">
                  ILLUSTRATIVE PREVIEW
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-light">
                The relaxed ensemble
              </h3>
            </div>

            {/* Card 3 */}
            <div className="space-y-4 group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#35332F]/5 border border-[#35332F]/10">
                <img
                  src="https://framerusercontent.com/images/fAOiTgdkUZ1vqHW95kWixB2igs.png"
                  alt="The quilted layer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#F5F1E9]/95 backdrop-blur-xs px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold text-[#35332F] border border-[#35332F]/10">
                  ILLUSTRATIVE PREVIEW
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#35332F] font-light">
                The quilted layer
              </h3>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 border border-[#35332F] bg-[#35332F] text-[#F5F1E9] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors"
            >
              <span>EXPLORE THE PUBLIC SHOWROOM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          07 / OUR PHILOSOPHY
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#EAE2D6]/40 border-b border-[#35332F]/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium block">
            07 / OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
            Thoughtfully made. Quietly expressive. Unmistakably individual.
          </h2>
          <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed max-w-2xl mx-auto pt-2">
            We believe the most meaningful clothing holds two things in balance: the hand of the maker and the life of the wearer.
          </p>
        </div>
      </section>

      {/* ========================================================
          08 / A PRIVATE VIEW (CATALOGUE CTA)
      ======================================================== */}
      <section className="py-24 sm:py-36 bg-[#F5F1E9] border-b border-[#35332F]/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#70745C] font-sans font-medium block">
            08 / A PRIVATE VIEW
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
            Discover what we’re creating.
          </h2>
          <p className="text-base text-[#5C5A54] font-sans leading-relaxed max-w-xl mx-auto">
            Explore our women’s apparel collections and discover the possibilities of working with Rudraksh.
          </p>
          <div className="pt-4">
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 border border-[#A18A73] bg-[#35332F] text-[#F5F1E9] px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#5C5A54] transition-all shadow-sm"
            >
              <span>REQUEST THE PRIVATE CATALOGUE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
