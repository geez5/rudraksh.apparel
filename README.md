# RUDRAKSH — Premium Women's Apparel Manufacturing, Export & Sourcing Platform

A production-ready digital showroom and B2B manufacturing platform engineered for **RUDRAKSH**, an India-based women's apparel manufacturer, garment exporter, and sourcing partner serving international fashion brands, private labels, and retailers.

---

## 1. Architecture & Technologies

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, Server & Client Components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom Quiet Luxury design tokens
- **Typography**: Cormorant Garamond (Editorial serif headings), Manrope & Inter (Modern geometric sans-serif)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend & Database
- **API**: Next.js Server Route Handlers with server-side validation & cryptographic hashing
- **Database**: [Supabase PostgreSQL](https://supabase.com/) with Row Level Security (RLS) policies
- **Storage**: Supabase Storage with private product photography bucket
- **Authentication**: Supabase Auth + Cryptographic token-based session management (`rudraksh_catalogue_access`, `rudraksh_admin_session`)

### Transactional Email
- **Email Service**: [Resend](https://resend.com/) with branded HTML templates matching the quiet luxury brand palette

---

## 2. Product Taxonomy & Categories

Built around the 7 core women's apparel categories:
1. **Dresses** — Midi, maxi, tiered silhouettes in 60s organic cambric
2. **Tops** — Blouses, tunics, and wrap tops with refined necklines
3. **Co-ord Sets** — Synchronized resort shirts and wide-leg trousers
4. **Shirts** — Structured poplin, linen, and hand-spun relaxed shirting
5. **Skirts** — Wrap, tiered, and A-line silhouettes with natural fastenings
6. **Block Print** — Traditional Sanganeri and Dabu mud-resist hand-block printing
7. **Quilted Jackets** — Reversible artisanal cotton-batting outerwear

> **Important**: *Block Print* functions both as an artisanal category and as an attribute/tag filter. Any garment tagged with "Block Print" (e.g. Sanganeri dresses) is discoverable across both silhouetted collections and the Block Print filter.

---

## 3. Directory Structure

```text
c:\Users\SHARM\rudraksh.apparel
├── src/
│   ├── app/
│   │   ├── (public)/              # Public Marketing Website
│   │   │   ├── page.tsx           # 11-section Editorial Homepage
│   │   │   ├── about/             # Atelier & Company Profile
│   │   │   ├── capabilities/      # End-to-end Manufacturing Architecture
│   │   │   ├── collections/       # Silhouette Lines & Category Discovery
│   │   │   ├── craftsmanship/     # Block Printing, Quilting & Natural Dyes
│   │   │   ├── contact/           # Direct Merchandising & Sourcing Desk
│   │   │   └── catalogue-request/ # Buyer Application & Registration Form
│   │   ├── catalogue/             # Private Digital Showroom
│   │   │   ├── page.tsx           # Search, Tag Filters, Category Tabs
│   │   │   └── [slug]/            # Multi-angle Photography & Tech Specs
│   │   ├── auth/
│   │   │   └── verify/            # Cryptographic Email Verification & Grant
│   │   ├── admin/                 # Executive Control Panel
│   │   │   ├── login/             # Secure Administrator Authentication
│   │   │   ├── dashboard/         # Real-time Operations Overview
│   │   │   ├── products/          # Full Product Lifecycle CRUD & Photos
│   │   │   ├── categories/        # Category Taxonomies & Covers
│   │   │   ├── buyers/            # Buyer Verification & Access Revocation
│   │   │   ├── requests/          # Request Approval / Rejection Pipeline
│   │   │   ├── enquiries/         # Line Inquiries & CSV Export
│   │   │   └── settings/          # Mode A/B Workflows & Site Settings
│   │   ├── api/                   # Server Route Handlers
│   │   │   ├── admin/             # Products, Categories, Auth, Logout
│   │   │   ├── catalogue-request/ # Secure Token Issuance & Dispatch
│   │   │   ├── verification/      # Token Hash Validation & Access Grant
│   │   │   ├── enquiries/         # Spec Requests & Resend Notification
│   │   │   └── contact/           # General Inquiries
│   │   ├── layout.tsx             # Root Layout with Font & Metadata
│   │   ├── globals.css            # Quiet Luxury Design Tokens
│   │   ├── sitemap.ts             # XML Sitemap (excludes private showroom)
│   │   └── robots.ts              # Search Engine Directives
│   ├── components/
│   │   ├── navigation/            # Header with Mobile Drawer & Footer
│   │   ├── products/              # ProductCard & CategoryCard
│   │   └── catalogue/             # Multi-image viewer & Enquiry Modal
│   ├── config/
│   │   └── site.ts                # Site Branding & Default Taxonomies
│   ├── lib/
│   │   ├── data/                  # Initial Rich Seed Catalog
│   │   ├── products.ts            # Data Layer (Supabase + Local fallback)
│   │   ├── security/              # Cryptographic Token Generators & Hashers
│   │   ├── email/                 # 12 Branded Transactional Email Templates
│   │   ├── validation/            # Zod Schemas
│   │   └── supabase/              # Browser, Server & Service Clients
│   └── middleware.ts              # Route Guard for /admin/* and /catalogue/*
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql # 12 Tables with Constraints & Triggers
│   │   └── 002_rls_policies.sql   # Strict Row Level Security Policies
│   └── seed.sql                   # Seed Script
├── tests/
│   └── runner.mjs                 # 18-Test Automated Acceptance Suite
├── .env.example
├── package.json
└── README.md
```

---

## 4. Getting Started

### Prerequisites
- Node.js 20+ (tested on Node v24)
- npm or pnpm

### Installation
```bash
git clone <repository-url>
cd rudraksh.apparel
npm install
```

### Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required environment variables:
```ini
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# Resend Transactional Email
RESEND_API_KEY=re_...
EMAIL_FROM=onboarding@resend.dev   # or verified domain like noreply@rudraksh.in
EMAIL_ADMIN=admin@rudraksh.in

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Admin Master Secret (Bootstrap access)
ADMIN_SETUP_SECRET=rudraksh_master_admin_2026
```

> **Note on Zero-Config Development**: If Supabase or Resend keys are not set, the application runs seamlessly using its built-in in-memory store and returns the verification URL directly in the response for zero-friction local testing.

---

## 5. Running the Application

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Automated Test Suite
Run the 18 automated acceptance tests covering Zod schemas, token hashing, Block Print discovery rules, and all 7 business workflows:
```bash
npm test
```

### Production Build
```bash
npm run build
npm run start
```

---

## 6. Administrator Access & Setup

### Default Login
Navigate to `/admin/login`:
- **Email**: `admin@rudraksh.in`
- **Password**: `Rudraksh@Admin2026`
- **Or Setup Secret**: Click *"Or sign in using Setup Secret Key"* and enter `rudraksh_master_admin_2026` (or your configured `ADMIN_SETUP_SECRET`).

### Configurable Catalogue Approval Modes
Administrators can switch approval workflows in `/admin/settings`:
- **Mode A (Automatic Approval)**: Instant 30-day showroom access is activated automatically the moment a buyer confirms their email address.
- **Mode B (Manual Review)**: Buyer confirms email, then request enters the `/admin/requests` queue for admin review and approval before access is unlocked.

---

## 7. Database & Supabase Configuration

To apply the database schema to your Supabase project:
1. Open your Supabase project SQL Editor.
2. Run `supabase/migrations/001_initial_schema.sql` to generate:
   - `categories`
   - `products`
   - `product_images`
   - `product_tags`
   - `buyers`
   - `catalogue_requests`
   - `verification_tokens` (stores sha256 hash only)
   - `catalogue_access`
   - `enquiries`
   - `admin_users`
   - `site_settings`
   - `audit_logs`
3. Run `supabase/migrations/002_rls_policies.sql` to enforce strict Row Level Security.
4. Create a storage bucket named `product-images` in Supabase Storage.

---

## 8. Deployment to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Add the environment variables from `.env.example`.
4. Deploy! Next.js App Router will compile all static pages and dynamic route handlers.

---

## 9. Security & Compliance Highlights

1. **Token Protection**: Verification tokens are generated with 32 cryptographically secure random bytes (`crypto.randomBytes(32)`). Only the SHA-256 hash is ever stored in the database.
2. **Access Expiration**: Catalogue access grants default to 30 days and are verified server-side on every request to `/catalogue/*`.
3. **Admin Route Guards**: Protected by `middleware.ts` verifying valid admin sessions before any `/admin/*` route executes.
4. **No Public Indexing**: All `/admin`, `/catalogue`, and `/api` paths are barred from web crawlers via `robots.ts` and `noindex` headers.
