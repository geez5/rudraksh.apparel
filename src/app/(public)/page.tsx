'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Scissors,
  Layers,
  ShieldCheck,
  Globe2,
  Heart,
  CheckCircle2,
  Leaf,
  Users2,
  ChevronRight,
  Recycle,
  Sparkle
} from 'lucide-react'

// Editorial category data
const garmentCategories = [
  {
    title: 'Quilted Jackets',
    slug: 'quilted-jackets',
    subtitle: 'Outerwear Architecture',
    description: 'Contemporary quilted silhouettes crafted with textured natural fabrics, breathable cotton wadding, and intricate linear stitching.',
    image: 'https://framerusercontent.com/images/fAOiTgdkUZ1vqHW95kWixB2igs.png',
    tag: 'Outerwear / Reversible',
    span: 'col-span-1 md:col-span-2 lg:col-span-7',
  },
  {
    title: 'Western Dresses',
    slug: 'dresses',
    subtitle: 'Contemporary Silhouettes',
    description: 'Effortless midi and maxi lengths engineered for international retail collections, from fluid tiering to refined tailoring.',
    image: 'https://framerusercontent.com/images/0Z15NAkSrmq92bFNnjOf7OTouws.png',
    tag: 'Daywear & Occasionwear',
    span: 'col-span-1 md:col-span-2 lg:col-span-5',
  },
  {
    title: 'Skirts',
    slug: 'skirts',
    subtitle: 'Fluid Drape & Structure',
    description: 'Contemporary tiered, pleated, and bias-cut skirts featuring traditional Indian block prints and botanical dye accents.',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=1000',
    tag: 'Statement & Casual',
    span: 'col-span-1 md:col-span-1 lg:col-span-4',
  },
  {
    title: 'Tops & Shirts',
    slug: 'tops',
    subtitle: 'Tailored Ease',
    description: 'Precision-cut shirts, feminine smocked blouses, and delicate pin-tucked yokes tailored in organic cotton voile and mulmul.',
    image: 'https://framerusercontent.com/images/TBs9biwNrC8Nk9Ej338Fh4NEvns.png',
    tag: 'Textured & Printed',
    span: 'col-span-1 md:col-span-1 lg:col-span-4',
  },
  {
    title: 'Co-ord Sets',
    slug: 'coord-sets',
    subtitle: 'Modern Ensembles',
    description: 'Coordinated two-piece sets designed for effortless modern lifestyle dressing — matching sets, tunics, and relaxed trousers.',
    image: 'https://framerusercontent.com/images/o1jxzf1wGB5SZZe8rNh5GgOnZg.png',
    tag: 'Matching Separates',
    span: 'col-span-1 md:col-span-2 lg:col-span-4',
  },
  {
    title: 'Printed Apparel',
    slug: 'block-print',
    subtitle: 'Artisanal & Modern Prints',
    description: 'Rich hand-block printed, Shibori tie-and-dye, and contemporary digital print garments with bespoke motif development.',
    image: 'https://framerusercontent.com/images/R4nHwZ5IckVSyOzyvKHubRqgpg.png',
    tag: 'Block Print / Tie-Dye / Digital',
    span: 'col-span-1 md:col-span-2 lg:col-span-12',
  },
]

// Printing techniques
const printingTechniques = [
  {
    id: 'block-print',
    name: 'Block Printing',
    lead: 'Rooted in traditional Indian textile artistry, block printing brings individuality, character and craftsmanship to contemporary apparel.',
    details: [
      'Hand-carved wooden blocks sculpted by hereditary artisans in Sheesham & Teak',
      'AZO-free color formulations and natural botanical indigo & madder vats',
      'Artisanal human variations that give each garment an unmistakable luxury soul',
    ],
    image: 'https://framerusercontent.com/images/R4nHwZ5IckVSyOzyvKHubRqgpg.png',
    kicker: 'HERITAGE CRAFT / TECHNIQUE 01',
  },
  {
    id: 'tie-dye',
    name: 'Tie & Dye',
    lead: 'Expressive colour, organic patterns and distinctive textile treatments bring a unique identity to every creation.',
    details: [
      'Artisanal Bandhani resist binding, clamp Shibori, and organic dip-dyeing',
      'Hand-regulated dye baths yielding gentle ombre washes and fluid transitions',
      'Custom color grading formulated to match Pantone TPX seasonal fashion palettes',
    ],
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=1000',
    kicker: 'ORGANIC COLOR / TECHNIQUE 02',
  },
  {
    id: 'digital-print',
    name: 'Digital Printing',
    lead: 'Contemporary digital printing allows creative flexibility, detailed patterns and versatile design possibilities for modern fashion collections.',
    details: [
      'High-resolution multi-color precision on natural cotton cambric, viscose, and silk',
      'Zero setup screens allowing agile sampling, rapid strikes, and limited runs',
      'Continuous repeat matching across plackets, collars, and tailored seams',
    ],
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1000',
    kicker: 'PRECISION / TECHNIQUE 03',
  },
]

// 7-Stage Manufacturing Timeline
const manufacturingStages = [
  {
    step: '01',
    title: 'Design & Development',
    desc: 'Translating buyer moodboards, sketches, or technical specifications into production-feasible design blueprints and fabric mapping.',
  },
  {
    step: '02',
    title: 'Fabric Selection & Sourcing',
    desc: 'Direct alliances with certified Indian spinning mills and handloom clusters to source organic cottons, pure flax linens, and custom weaves.',
  },
  {
    step: '03',
    title: 'Printing & Textile Development',
    desc: 'Wooden block carving, strike-offs, lab-dip approvals, and dye-fastness testing before bulk yardage printing begins.',
  },
  {
    step: '04',
    title: 'Pattern Making & Sampling',
    desc: 'Master paper patterns and CAD grading for Western sizing (US 2–18 / UK 6–22) with fit validation on live fit models.',
  },
  {
    step: '05',
    title: 'Garment Cutting & Stitching',
    desc: 'Precision computerized cutting followed by industrial lockstitch sewing (12–14 SPI), French seams, and enclosed bias finishing.',
  },
  {
    step: '06',
    title: 'Finishing & Quality Inspection',
    desc: 'AQL 2.5 inline and final random audits, thread trimming, multi-point measurement checks, and calibrated needle detection.',
  },
  {
    step: '07',
    title: 'Packaging & Export Preparation',
    desc: 'Custom private-label barcoding, branded eco-packaging, export fumigation, and global freight dispatch to international ports.',
  },
]

export default function HomePage() {
  const [activeTechnique, setActiveTechnique] = useState(0)

  return (
    <div className="flex flex-col bg-[#F5F1E9] text-[#35332F] overflow-hidden">
      {/* =========================================================================
          SECTION 1: CINEMATIC HERO
          ========================================================================= */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10">
        {/* Subtle Background Glow/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E9] via-[#FAF6EF] to-[#F5F1E9] -z-10" />

        {/* Top Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[1400px] mx-auto w-full border-b border-[#35332F]/10 pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#A76C50] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#777B65] font-sans font-semibold">
              RUDRAKSH / WOMEN'S APPAREL MANUFACTURING & EXPORT
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#35332F]/70 font-sans">
            INDIA TO THE WORLD • B2B PARTNERSHIPS
          </span>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto py-10 lg:py-16">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-[96px] font-light text-[#35332F] leading-[0.95] tracking-tight">
                THE ART OF <br />
                <span className="italic font-normal text-[#A76C50]">MAKING.</span>
              </h1>
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#35332F]/90 leading-tight pt-2">
                Contemporary women's fashion. <br className="hidden sm:inline" />
                Thoughtfully crafted in India. Made for the world.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed max-w-xl"
            >
              RUDRAKSH is a women's apparel manufacturing and export house creating export-quality ready-made garments through a combination of contemporary design, textile craftsmanship and responsible production.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <Link
                href="/capabilities"
                className="inline-flex items-center justify-center gap-3 bg-[#35332F] text-[#F5F1E9] px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#A76C50] hover:text-white"
              >
                <span>EXPLORE OUR CAPABILITIES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-[#35332F] text-[#35332F] px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#35332F] hover:text-[#F5F1E9]"
              >
                <span>PARTNER WITH US</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust metrics pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-6 flex flex-wrap items-center gap-6 text-[11px] tracking-widest uppercase text-[#777B65] font-sans"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A76C50]" />
                Low MOQ Capsules
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A76C50]" />
                AQL 2.5 Quality Standards
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A76C50]" />
                Full Package OEM / ODM
              </span>
            </motion.div>
          </div>

          {/* Right Editorial Photography Spread */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#E7DFD2] shadow-2xl"
            >
              <img
                src="https://framerusercontent.com/images/0Z15NAkSrmq92bFNnjOf7OTouws.png"
                alt="RUDRAKSH Women's Contemporary Printed Dress"
                className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03] transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C7B1] font-sans font-medium">
                  SAMPLE COLLECTION / SILHOUETTE PREVIEW
                </span>
                <p className="font-serif text-xl sm:text-2xl font-light italic">
                  Pure Cambric Cotton Block-Printed Tiered Dress
                </p>
              </div>
            </motion.div>

            {/* Small floating detail card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-[#292825] text-[#F5F1E9] p-5 max-w-xs border border-white/10 shadow-xl"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#A76C50] font-sans font-semibold">
                CRAFTSMANSHIP DETAIL
              </p>
              <p className="font-serif text-sm italic mt-1 leading-snug">
                Hand-carved wooden block stamping in AZO-free earth pigment on 60s count mulmul.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Ticker / Scrolling Bar */}
        <div className="max-w-[1400px] mx-auto w-full border-t border-[#35332F]/10 pt-4 flex items-center justify-between text-[10px] tracking-[0.28em] uppercase text-[#777B65] font-sans overflow-hidden">
          <span>QUILTED JACKETS</span>
          <span>•</span>
          <span>WESTERN DRESSES</span>
          <span>•</span>
          <span>SKIRTS</span>
          <span>•</span>
          <span>TOPS & SHIRTS</span>
          <span>•</span>
          <span>CO-ORD SETS</span>
          <span>•</span>
          <span>HAND BLOCK PRINTING</span>
          <span>•</span>
          <span>TIE & DYE</span>
          <span>•</span>
          <span>EXPORT QUALITY</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BRAND INTRODUCTION
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10 bg-[#FAF6EF]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden bg-[#E7DFD2] shadow-xl relative">
                <img
                  src="https://framerusercontent.com/images/X0GvzMI58bdKA5HXDxypymct4rg.png"
                  alt="RUDRAKSH Atelier & Garment Craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#35332F]/10 pointer-events-none" />
              </div>
              <div className="absolute -top-6 -right-6 bg-[#35332F] text-[#F5F1E9] p-6 hidden sm:block max-w-[240px]">
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#D8C7B1] block">
                  CRAFT DISCIPLINE
                </span>
                <p className="font-serif text-lg italic mt-1 leading-snug">
                  "Respecting the hand that makes, elevating the form that wears."
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
                  COMPANY PROFILE & POSITIONING
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#35332F] leading-tight">
                  WHERE CRAFTSMANSHIP MEETS CONTEMPORARY FASHION.
                </h2>
              </div>

              <div className="space-y-5 text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed">
                <p>
                  RUDRAKSH was established to serve discerning international fashion labels, independent designers, and apparel retailers who require a transparent, quality-first manufacturing partner in India.
                </p>
                <p>
                  We sit at the intersection of traditional Indian textile craft and contemporary Western fashion sensibilities. By uniting centuries-old wooden block printing and artisanal dyeing with strict Western sizing specifications, industrial lockstitch tailoring, and disciplined export standards, we transform creative sketches into retail-ready collections.
                </p>
              </div>

              {/* 5 Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#35332F]/10">
                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl text-[#35332F] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A76C50]" />
                    Modern Western Silhouettes
                  </h4>
                  <p className="text-xs text-[#777B65] leading-relaxed">
                    Accurate pattern drafting and grading tailored for global retail fitting standards.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl text-[#35332F] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A76C50]" />
                    Traditional Indian Printing
                  </h4>
                  <p className="text-xs text-[#777B65] leading-relaxed">
                    Carved wooden blocks, organic resist dyes, and precision digital print matching.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl text-[#35332F] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A76C50]" />
                    Premium Construction
                  </h4>
                  <p className="text-xs text-[#777B65] leading-relaxed">
                    High SPI lockstitching, French seams, enclosed bias binding, and zero raw edges.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-serif text-xl text-[#35332F] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A76C50]" />
                    International Export Standards
                  </h4>
                  <p className="text-xs text-[#777B65] leading-relaxed">
                    AQL 2.5 compliance, custom private labeling, and seamless air/sea freight customs.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#35332F] hover:text-[#A76C50] transition-colors"
                >
                  <span>READ OUR FULL STORY & PHILOSOPHY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT WE CREATE — GARMENT CATEGORIES
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10">
        <div className="max-w-[1400px] mx-auto space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#35332F]/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
                PORTFOLIO & CORE CATEGORIES
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
                WHAT WE CREATE.
              </h2>
              <p className="text-sm sm:text-base text-[#35332F]/75 font-sans leading-relaxed">
                Six specialized garment categories engineered with premium cottons, flax linens, artisanal prints, and refined silhouettes for global womenswear collections.
              </p>
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center gap-2 border border-[#35332F] text-[#35332F] px-6 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#35332F] hover:text-[#F5F1E9] transition-colors self-start md:self-auto"
            >
              <span>EXPLORE ALL COLLECTIONS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Magazine-style Asymmetrical Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {garmentCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/collections?category=${category.slug}`}
                className={`group relative overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 flex flex-col justify-between transition-all duration-500 hover:border-[#A76C50] hover:shadow-xl ${category.span}`}
              >
                <div className="relative aspect-[16/11] md:aspect-[4/3] overflow-hidden bg-[#E7DFD2]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center filter saturate-[0.95] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Kicker Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#292825]/85 backdrop-blur-xs text-[#F5F1E9] text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 font-sans">
                      {category.tag}
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F1E9] text-[#292825] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 space-y-3 bg-[#FAF6EF] flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76C50] font-sans font-semibold">
                      0{index + 1} / {category.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F] group-hover:text-[#A76C50] transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#35332F]/75 font-sans leading-relaxed">
                    {category.description}
                  </p>
                  <div className="pt-4 border-t border-[#35332F]/5 flex items-center justify-between text-[11px] tracking-widest uppercase text-[#35332F] font-semibold group-hover:text-[#A76C50]">
                    <span>VIEW CATEGORY SILHOUETTES</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR PRINTING & TEXTILE TECHNIQUES
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10 bg-[#FAF6EF]">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
              ARTISANAL PRINTING CAPABILITIES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              PRINTS THAT TELL A STORY.
            </h2>
            <p className="text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed">
              We offer three specialized printing streams for international apparel collections: traditional wooden block printing, organic hand tie-and-dye, and modern digital print precision.
            </p>
          </div>

          {/* Interactive Three-Part Technique Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Tabs Column */}
            <div className="lg:col-span-5 space-y-6">
              {printingTechniques.map((tech, index) => {
                const isActive = activeTechnique === index
                return (
                  <button
                    key={tech.id}
                    onClick={() => setActiveTechnique(index)}
                    className={`w-full text-left p-6 sm:p-8 border transition-all duration-300 relative ${
                      isActive
                        ? 'bg-[#F5F1E9] border-[#A76C50] shadow-md'
                        : 'bg-transparent border-[#35332F]/10 hover:border-[#35332F]/30'
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-[#777B65] font-sans font-semibold block">
                        {tech.kicker}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F]">
                        {tech.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#35332F]/80 font-sans leading-relaxed pt-1">
                        {tech.lead}
                      </p>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-[#35332F]/10 space-y-2">
                        {tech.details.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2 text-xs text-[#35332F]/75 font-sans">
                            <span className="text-[#A76C50] mt-0.5">•</span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}

              <div className="pt-2">
                <Link
                  href="/craftsmanship"
                  className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#A76C50] transition-colors"
                >
                  <span>LEARN MORE ABOUT OUR TEXTILE CRAFT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Display Image */}
            <div className="lg:col-span-7">
              <motion.div
                key={activeTechnique}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#E7DFD2] shadow-2xl border border-[#35332F]/10"
              >
                <img
                  src={printingTechniques[activeTechnique].image}
                  alt={printingTechniques[activeTechnique].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/75 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C7B1]">
                    RUDRAKSH TEXTILE CAPABILITY
                  </span>
                  <h4 className="font-serif text-2xl italic">
                    {printingTechniques[activeTechnique].name} in Production
                  </h4>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: OUR MANUFACTURING CAPABILITIES
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#35332F]/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
                END-TO-END PRODUCTION PIPELINE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
                FROM CONCEPT TO COMPLETED GARMENT.
              </h2>
              <p className="text-sm sm:text-base text-[#35332F]/75 font-sans leading-relaxed">
                Rudraksh operates as a true full-package apparel manufacturing partner. We oversee every critical milestone from fabric development to export container dispatch.
              </p>
            </div>

            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 border border-[#35332F] text-[#35332F] px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#35332F] hover:text-[#F5F1E9] transition-colors self-start lg:self-auto"
            >
              <span>VIEW FULL CAPABILITIES SPEC SHEET</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 7-Stage Horizontal Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {manufacturingStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#FAF6EF] p-6 border border-[#35332F]/10 flex flex-col justify-between hover:border-[#A76C50] transition-colors group"
              >
                <div className="space-y-3">
                  <span className="font-serif text-3xl text-[#A76C50] block group-hover:scale-105 transition-transform">
                    {stage.step}
                  </span>
                  <h4 className="font-serif text-lg text-[#35332F] leading-snug">
                    {stage.title}
                  </h4>
                </div>
                <p className="text-xs text-[#35332F]/70 font-sans leading-relaxed pt-4 border-t border-[#35332F]/5 mt-4">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sourcing & Sampling Highlights */}
          <div className="bg-[#292825] text-[#F5F1E9] p-8 sm:p-12 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="font-serif text-xl text-[#F5F1E9] flex items-center gap-2">
                <Scissors className="w-5 h-5 text-[#A76C50]" />
                Rapid Sample Cell
              </h4>
              <p className="text-xs text-[#D8C7B1] leading-relaxed">
                Dedicated prototype unit producing approved fit and PP counter-samples within 10–14 working days.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-xl text-[#F5F1E9] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#A76C50]" />
                AQL 2.5 Compliance
              </h4>
              <p className="text-xs text-[#D8C7B1] leading-relaxed">
                Stringent inline inspection and four-point fabric auditing guaranteeing export-grade seam fidelity.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-xl text-[#F5F1E9] flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#A76C50]" />
                Worldwide Logistics
              </h4>
              <p className="text-xs text-[#D8C7B1] leading-relaxed">
                Complete documentation: Certificate of Origin, packing lists, barcode compliance, and FOB/CIF shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: RESPONSIBLE MANUFACTURING — SUSTAINABILITY
          ========================================================================= */}
      <section id="sustainability" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10 bg-[#FAF6EF]">
        <div className="max-w-[1400px] mx-auto space-y-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#777B65] font-sans font-semibold">
              RESPONSIBLE APPAREL PRODUCTION
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              MADE WITH PURPOSE. <br />
              <span className="italic font-normal text-[#A76C50]">PRODUCED WITH RESPONSIBILITY.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed pt-2">
              At RUDRAKSH, manufacturing garments comes with a moral obligation to both the environment and the skilled hands who create them. We practice conscious manufacturing rooted in ethical waste management and social inclusion.
            </p>
          </div>

          {/* Three Core Responsibility Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pillar 1: Ethical Waste Management */}
            <div className="bg-[#F5F1E9] p-8 sm:p-10 border border-[#35332F]/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#777B65]/15 flex items-center justify-center text-[#777B65]">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F]">
                  Ethical Waste Management
                </h3>
                <p className="text-xs sm:text-sm text-[#35332F]/80 font-sans leading-relaxed">
                  "Garment production comes with responsibility. We emphasise ethical disposal and responsible handling of manufacturing waste, with an effort to minimise environmental impact."
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[#35332F]/75 font-sans pt-4 border-t border-[#35332F]/10">
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Responsible waste disposal protocols
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Proper segregation of cutting scrap & fabric offcuts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Conscious production practices reducing over-cutting
                </li>
              </ul>
            </div>

            {/* Pillar 2: Sustainable Manufacturing Unit */}
            <div className="bg-[#F5F1E9] p-8 sm:p-10 border border-[#35332F]/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#A76C50]/15 flex items-center justify-center text-[#A76C50]">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F]">
                  Sustainable Manufacturing Unit
                </h3>
                <p className="text-xs sm:text-sm text-[#35332F]/80 font-sans leading-relaxed">
                  Our manufacturing unit is continuously improving its operations to prioritize natural, breathable fibers like pure cotton and flax linen over petroleum synthetics, alongside biodegradable natural cotton batting in our quilted outerwear.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[#35332F]/75 font-sans pt-4 border-t border-[#35332F]/10">
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  AZO-free color formulations and natural botanical vats
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Zero polyester wadding — only carded cotton batting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Continuous factory safety & ventilation monitoring
                </li>
              </ul>
            </div>

            {/* Pillar 3: Empowering Women */}
            <div className="bg-[#F5F1E9] p-8 sm:p-10 border border-[#35332F]/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#777B65]/15 flex items-center justify-center text-[#777B65]">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#35332F]">
                  Empowering Women Through Opportunity
                </h3>
                <p className="text-xs sm:text-sm text-[#35332F]/80 font-sans leading-relaxed italic">
                  "We believe that opportunity creates independence. By employing women and encouraging their participation in garment manufacturing, we aim to contribute towards a more inclusive workforce where skill, dedication and craftsmanship are valued."
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[#35332F]/75 font-sans pt-4 border-t border-[#35332F]/10">
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Equitable remuneration and dignified work conditions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Skilling across pattern cutting, checking, and sewing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A76C50]">✓</span>
                  Safe, inclusive, and collaborative atelier culture
                </li>
              </ul>
            </div>
          </div>

          {/* Authentic Atelier Atmosphere Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#292825] text-[#F5F1E9] p-8 sm:p-12 border border-white/10">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A76C50] font-sans font-semibold">
                HONEST B2B TRANSPARENCY
              </span>
              <h3 className="font-serif text-3xl font-light text-white">
                Verifiable Practices. Candid Collaboration.
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C7B1] font-sans leading-relaxed max-w-2xl">
                We do not make extravagant, unverified environmental claims or invent statistics. We welcome brand technical teams to visit our facility, inspect fabric certifications, and meet the artisans behind our collections directly.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F5F1E9] text-[#292825] px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#A76C50] hover:text-white transition-colors"
              >
                <span>DISCUSS ETHICAL SOURCING</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: OUR DESIGN PHILOSOPHY
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
              CREATIVE DIRECTION & IDENTITY
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              INDIAN ROOTS. GLOBAL PERSPECTIVE.
            </h2>
            <p className="text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed">
              We harmoniously merge ancient textile heritage with modern international ready-to-wear silhouettes.
            </p>
          </div>

          {/* Editorial Visual Collage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Large Card 1 */}
            <div className="md:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 shadow-lg group">
              <img
                src="https://framerusercontent.com/images/0Z15NAkSrmq92bFNnjOf7OTouws.png"
                alt="Contemporary Western Dress with Indian Floral Motifs"
                className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C7B1]">
                  STUDY IN SILHOUETTE
                </span>
                <h4 className="font-serif text-2xl italic">The Printed Western Silhouette</h4>
              </div>
            </div>

            {/* Side Card 2 */}
            <div className="md:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] md:aspect-auto overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 shadow-lg group">
              <img
                src="https://framerusercontent.com/images/fAOiTgdkUZ1vqHW95kWixB2igs.png"
                alt="Quilted Cotton Jacket with Kantha Detailing"
                className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8C7B1]">
                  STRUCTURE & LAYER
                </span>
                <h4 className="font-serif text-2xl italic">The Quilted Outerwear Layer</h4>
              </div>
            </div>

            {/* Bottom Row 3 Cards */}
            <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 shadow-md group">
              <img
                src="https://framerusercontent.com/images/TBs9biwNrC8Nk9Ej338Fh4NEvns.png"
                alt="Coordinated Two-Piece Ensemble"
                className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h5 className="font-serif text-lg italic">The Relaxed Co-ord Ensemble</h5>
              </div>
            </div>

            <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 shadow-md group">
              <img
                src="https://framerusercontent.com/images/R4nHwZ5IckVSyOzyvKHubRqgpg.png"
                alt="Textile Macro Texture"
                className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h5 className="font-serif text-lg italic">Tactile Cotton Cambric & Resist Mud</h5>
              </div>
            </div>

            <div className="md:col-span-4 relative aspect-[4/3] overflow-hidden bg-[#FAF6EF] border border-[#35332F]/10 shadow-md group">
              <img
                src="https://framerusercontent.com/images/o1jxzf1wGB5SZZe8rNh5GgOnZg.png"
                alt="Printed Tiered Skirt"
                className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292825]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h5 className="font-serif text-lg italic">Fluid Printed Skirt Drape</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: WHY PARTNER WITH RUDRAKSH?
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-b border-[#35332F]/10 bg-[#FAF6EF]">
        <div className="max-w-[1400px] mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#A76C50] font-sans font-semibold">
              B2B MANUFACTURING ADVANTAGES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#35332F] leading-tight">
              YOUR VISION. OUR CRAFT. <br />
              <span className="italic font-normal text-[#A76C50]">ONE CREATIVE PARTNERSHIP.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#35332F]/80 font-sans leading-relaxed">
              We eliminate the friction commonly experienced when manufacturing overseas by offering proactive communication, technical pattern acumen, and reliable export schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F5F1E9] p-8 border border-[#35332F]/10 space-y-3 hover:border-[#A76C50] transition-colors">
              <span className="font-serif text-2xl text-[#A76C50]">01</span>
              <h4 className="font-serif text-xl text-[#35332F]">Womenswear Focus</h4>
              <p className="text-xs text-[#35332F]/75 leading-relaxed">
                Dedicated exclusively to women's apparel: dresses, tops, jackets, skirts, and co-ords with nuanced understanding of female drape and fit.
              </p>
            </div>

            <div className="bg-[#F5F1E9] p-8 border border-[#35332F]/10 space-y-3 hover:border-[#A76C50] transition-colors">
              <span className="font-serif text-2xl text-[#A76C50]">02</span>
              <h4 className="font-serif text-xl text-[#35332F]">Export-Quality Finishing</h4>
              <p className="text-xs text-[#35332F]/75 leading-relaxed">
                Industrial lockstitching, French seams, and strict AQL 2.5 quality control tailored to meet demanding European and US retail criteria.
              </p>
            </div>

            <div className="bg-[#F5F1E9] p-8 border border-[#35332F]/10 space-y-3 hover:border-[#A76C50] transition-colors">
              <span className="font-serif text-2xl text-[#A76C50]">03</span>
              <h4 className="font-serif text-xl text-[#35332F]">Diverse Printing Streams</h4>
              <p className="text-xs text-[#35332F]/75 leading-relaxed">
                Flexibility across traditional hand block printing, organic resist tie-dyeing, and contemporary digital print solutions.
              </p>
            </div>

            <div className="bg-[#F5F1E9] p-8 border border-[#35332F]/10 space-y-3 hover:border-[#A76C50] transition-colors">
              <span className="font-serif text-2xl text-[#A76C50]">04</span>
              <h4 className="font-serif text-xl text-[#35332F]">Agile Customization</h4>
              <p className="text-xs text-[#35332F]/75 leading-relaxed">
                Flexible minimum order quantities (MOQ starting from 60–100 pcs per style), enabling boutique testing alongside scalable production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: PARTNERSHIP CTA
          ========================================================================= */}
      <section className="py-28 sm:py-36 px-6 sm:px-10 lg:px-14 bg-[#292825] text-[#F5F1E9] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A76C50]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto text-center space-y-8 relative z-10">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#A76C50] font-sans font-semibold">
            INITIATE A SOURCING DIALOGUE
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white leading-tight">
            LET'S CREATE SOMETHING <br />
            <span className="italic font-normal text-[#D8C7B1]">EXTRAORDINARY.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D8C7B1] font-sans leading-relaxed max-w-2xl mx-auto">
            Looking for a manufacturing partner who understands fashion, craftsmanship and responsible production? Let's bring your next collection to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F5F1E9] text-[#292825] px-9 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:bg-[#A76C50] hover:text-white"
            >
              <span>START A PARTNERSHIP</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/catalogue-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-[#A18A73] text-[#F5F1E9] px-9 py-4 text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              <span>REQUEST OUR CATALOGUE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-[11px] tracking-widest uppercase text-[#A18A73]">
            <span>Fast Prototype Sampling</span>
            <span>•</span>
            <span>Dedicated Tech Pack Review</span>
            <span>•</span>
            <span>24h Inquiries Response</span>
          </div>
        </div>
      </section>
    </div>
  )
}
