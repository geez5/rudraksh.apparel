import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Sparkles, Layers, Scissors, Heart } from 'lucide-react'

export const metadata = {
  title: 'Indian Textile Craftsmanship & Artisanal Techniques | RUDRAKSH',
  description:
    'Explore our artisanal textile heritage: hand block printing, natural botanical dyes, kantha quilting, delicate pin-tucking, and fine needlecraft.',
}

export default function CraftsmanshipPage() {
  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F]">
      {/* Header */}
      <section className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-sans font-semibold">
              Heritage Techniques
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#35332F] leading-tight">
              Craftsmanship with Tactile Depth and Artisanal Integrity.
            </h1>
            <p className="text-base sm:text-lg text-[#5C5A54] font-sans leading-relaxed pt-2">
              Our garments celebrate human touch. We integrate traditional hand-block printing, artisanal quilting, and meticulous needlework into contemporary ready-to-wear silhouettes.
            </p>
          </div>
        </div>
      </section>

      {/* Craft 1: Hand Block Printing */}
      <section id="block-print" className="py-20 sm:py-28 border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
                Technique 01
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Hand-Carved Wooden Block Printing
              </h2>
              <div className="w-16 h-[1.5px] bg-[#A18A73]" />
              <p className="text-sm sm:text-base text-[#5C5A54] leading-relaxed">
                Carved by hand from seasoned sheesham (Indian rosewood) or teak, each wooden printing block is a miniature sculpture. The artisan immerses the block into formulated natural or AZO-free pigment paste and presses it firmly onto tautly stretched fabric, repeating the rhythm thousands of times per bolt.
              </p>

              <div className="space-y-4 pt-2">
                <div className="border-l-2 border-[#A18A73] pl-4">
                  <h4 className="font-serif text-lg text-[#35332F]">Sanganeri Fine Florals</h4>
                  <p className="text-xs text-[#5C5A54] mt-0.5">
                    Characterized by crisp outlines and delicate floral jaals printed on pristine white or pale ivory grounds.
                  </p>
                </div>
                <div className="border-l-2 border-[#A18A73] pl-4">
                  <h4 className="font-serif text-lg text-[#35332F]">Dabu Mud-Resist Printing</h4>
                  <p className="text-xs text-[#5C5A54] mt-0.5">
                    Clay, gum, and sawdust paste stamped onto cloth before cold-vat indigo immersion, creating organic veins and depth of shade.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#35332F]/5">
                <img
                  src="https://framerusercontent.com/images/R4nHwZ5IckVSyOzyvKHubRqgpg.png"
                  alt="Carved Wooden Printing Block on Cambric Cotton"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft 2: Artisanal Quilting */}
      <section id="quilting" className="py-20 sm:py-28 bg-[#EFE9DF] border-b border-[#35332F]/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
                Technique 02
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F] leading-tight">
                Kantha & Linear Cotton Quilting
              </h2>
              <div className="w-16 h-[1.5px] bg-[#A18A73]" />
              <p className="text-sm sm:text-base text-[#5C5A54] leading-relaxed">
                Our quilted outerwear marries ancient layering traditions with contemporary tailored cuts. Clean sheets of 100% natural carded cotton batting are enclosed between printed or solid shell fabrics, secured by parallel rows of high-density stitching.
              </p>
              <div className="space-y-4 pt-2">
                <div className="border-l-2 border-[#A18A73] pl-4">
                  <h4 className="font-serif text-lg text-[#35332F]">Zero Synthetic Fill</h4>
                  <p className="text-xs text-[#5C5A54] mt-0.5">
                    We use purely biodegradable cotton batting instead of polyester wadding, ensuring breathable thermal insulation and soft drape.
                  </p>
                </div>
                <div className="border-l-2 border-[#A18A73] pl-4">
                  <h4 className="font-serif text-lg text-[#35332F]">Reversible Engineering</h4>
                  <p className="text-xs text-[#5C5A54] mt-0.5">
                    Tailored with enclosed bias-bound seams and reversible closures, giving two distinct looks in a single silhouette.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#35332F]/5">
                <img
                  src="https://framerusercontent.com/images/fAOiTgdkUZ1vqHW95kWixB2igs.png"
                  alt="Quilted Cotton Jacket with Contrast Piping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft 3: Tailoring Details */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase text-[#70745C] font-semibold">
              The Finishing Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#35332F]">
              Structural Details & Sewing Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-4">
              <Scissors className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-2xl text-[#35332F]">French Seams & Bias Enclosures</h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed">
                Raw serged edges are avoided in our premium lines. Clean interior French seams and self-fabric bias bindings ensure garments feel as luxurious inside as they appear outside.
              </p>
            </div>

            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-4">
              <Sparkles className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-2xl text-[#35332F]">Micro Pin-Tucks & Gathers</h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed">
                Delicate needle-folded pin-tucks on shirt yokes and dress bodices add tactile texture without adding bulk, executed on lightweight mulmul and cotton voile.
              </p>
            </div>

            <div className="bg-[#FEFCF8] p-8 border border-[#35332F]/10 space-y-4">
              <Layers className="w-6 h-6 text-[#70745C]" />
              <h3 className="font-serif text-2xl text-[#35332F]">Natural Trims & Fastenings</h3>
              <p className="text-xs sm:text-sm text-[#5C5A54] leading-relaxed">
                Mother-of-pearl, recycled river shell, coconut husk, and corozo nut buttons. Hand-spun drawstrings with handmade cloth tassels and cotton loops.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/catalogue-request"
              className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5C5A54] transition-colors"
            >
              <span>Explore These Techniques In Our Showroom</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
