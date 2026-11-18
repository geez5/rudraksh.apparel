// Product Types
export type ProductStatus = 'draft' | 'active' | 'archived'
export type ImageType = 'front' | 'back' | 'detail' | 'lifestyle'

export interface ProductImage {
  id: string
  product_id: string
  storage_path: string
  alt_text: string | null
  image_type: ImageType
  sort_order: number
  created_at: string
  signed_url?: string
}

export interface ProductTag {
  id: string
  product_id: string
  tag: string
  created_at: string
}

export interface Product {
  id: string
  sku: string
  slug: string
  name: string
  description: string | null
  category_id: string
  fabric: string | null
  composition: string | null
  colour_options: string[] | null
  size_range: string[] | null
  customisation: string | null
  moq: string | null
  status: ProductStatus
  featured: boolean
  public_preview: boolean
  created_at: string
  updated_at: string
  // Relations
  category?: Category
  images?: ProductImage[]
  tags?: ProductTag[]
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_path: string | null
  sort_order: number
  active: boolean
  created_at: string
  updated_at: string
  // Relations
  products?: Product[]
}

// Buyer Types
export type BusinessType =
  | 'fashion_brand'
  | 'retailer'
  | 'wholesaler'
  | 'distributor'
  | 'sourcing_agent'
  | 'private_label'
  | 'other'

export interface Buyer {
  id: string
  full_name: string
  email: string
  company_name: string
  country: string
  business_type: BusinessType
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

// Catalogue Request Types
export type RequestStatus = 'pending' | 'email_verified' | 'approved' | 'rejected' | 'expired'

export interface CatalogueRequest {
  id: string
  buyer_id: string
  status: RequestStatus
  message: string | null
  requested_at: string
  reviewed_at: string | null
  reviewed_by: string | null
  rejection_reason: string | null
  // Relations
  buyer?: Buyer
}

// Catalogue Access Types
export interface CatalogueAccess {
  id: string
  buyer_id: string
  granted_by: string | null
  granted_at: string
  expires_at: string
  revoked_at: string | null
  access_reason: string | null
  // Relations
  buyer?: Buyer
}

// Enquiry Types
export type EnquiryStatus = 'new' | 'contacted' | 'in_discussion' | 'quoted' | 'closed'

export interface Enquiry {
  id: string
  buyer_id: string | null
  product_id: string | null
  requested_quantity: string | null
  message: string
  status: EnquiryStatus
  created_at: string
  updated_at: string
  // Relations
  buyer?: Buyer
  product?: Product
  // For anonymous enquiries
  contact_name?: string
  contact_email?: string
  contact_company?: string
  contact_country?: string
}

// Admin Types
export type AdminRole = 'super_admin' | 'admin' | 'viewer'

export interface AdminUser {
  id: string
  auth_user_id: string
  role: AdminRole
  active: boolean
  created_at: string
}

// Site Settings Types
export interface SiteSettings {
  catalogue_approval_mode: 'automatic' | 'manual'
  catalogue_access_days: number
  featured_product_ids: string[]
  homepage_text: Record<string, string>
  contact_info: {
    email: string
    phone: string
    whatsapp: string
    address: string
  }
  social_links: {
    instagram: string
    linkedin: string
  }
  email_notifications: {
    admin_new_request: boolean
    admin_new_enquiry: boolean
  }
}

// Audit Log Types
export interface AuditLog {
  id: string
  actor_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

// Form Types
export interface CatalogueRequestForm {
  full_name: string
  email: string
  company_name: string
  country: string
  business_type: BusinessType
  message?: string
  consent: boolean
  privacy_policy: boolean
}

export interface EnquiryForm {
  name: string
  email: string
  company: string
  country: string
  product_id?: string
  requested_quantity?: string
  message: string
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  enquiry_type: string
  message: string
}
