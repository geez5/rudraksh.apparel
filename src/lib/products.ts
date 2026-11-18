import type { Product, Category } from '../types'
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './data/mock-data'

async function getSupabaseServerClient() {
  try {
    const { createClient } = await import('./supabase/server')
    return await createClient()
  } catch {
    return null
  }
}

async function getSupabaseServiceClient() {
  try {
    const { createServiceClient } = await import('./supabase/server')
    return await createServiceClient()
  } catch {
    return null
  }
}

// In-memory store for newly added products in dev mode
let inMemoryProducts: Product[] = [...INITIAL_PRODUCTS]
let inMemoryCategories: Category[] = [...INITIAL_CATEGORIES]

export async function getCategories(): Promise<Category[]> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await getSupabaseServerClient()
      if (supabase) {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true })

        if (!error && data && data.length > 0) {
          return data as Category[]
        }
      }
    }
  } catch (err) {
    console.warn('Fallback to local categories:', err)
  }
  return inMemoryCategories.filter((c) => c.active)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug) || null
}

export interface ProductFilters {
  categorySlug?: string
  tag?: string
  search?: string
  fabric?: string
  featured?: boolean
  publicPreviewOnly?: boolean
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  let products = [...inMemoryProducts]

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await getSupabaseServerClient()
      if (supabase) {
        let query = supabase.from('products').select(`
          *,
          category:categories(*),
          images:product_images(*),
          tags:product_tags(*)
        `)

        if (filters?.publicPreviewOnly) {
          query = query.eq('status', 'active').eq('public_preview', true)
        }

        const { data, error } = await query
        if (!error && data && data.length > 0) {
          products = data as Product[]
        }
      }
    }
  } catch (err) {
    console.warn('Fallback to local products store:', err)
  }

  // Populate category relation if missing
  products = products.map((p) => {
    if (!p.category) {
      const cat = inMemoryCategories.find((c) => c.id === p.category_id)
      return { ...p, category: cat }
    }
    return p
  })

  // Apply filters
  if (filters?.publicPreviewOnly) {
    products = products.filter((p) => p.status === 'active' && p.public_preview)
  }

  if (filters?.featured) {
    products = products.filter((p) => p.featured)
  }

  if (filters?.categorySlug) {
    // If the category is 'block-print', also match products having the 'Block Print' tag!
    if (filters.categorySlug === 'block-print') {
      products = products.filter(
        (p) =>
          p.category?.slug === 'block-print' ||
          p.tags?.some((t) => t.tag.toLowerCase().includes('block print'))
      )
    } else {
      products = products.filter((p) => p.category?.slug === filters.categorySlug)
    }
  }

  if (filters?.tag) {
    const targetTag = filters.tag.toLowerCase()
    products = products.filter((p) =>
      p.tags?.some((t) => t.tag.toLowerCase() === targetTag)
    )
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.fabric?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    )
  }

  return products
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await getSupabaseServerClient()
      if (supabase) {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*),
            images:product_images(*),
            tags:product_tags(*)
          `)
          .eq('slug', slug)
          .single()

        if (!error && data) {
          return data as Product
        }
      }
    }
  } catch (err) {
    console.warn('Fallback to local product lookup:', err)
  }

  const p = inMemoryProducts.find((p) => p.slug === slug)
  if (!p) return null

  if (!p.category) {
    p.category = inMemoryCategories.find((c) => c.id === p.category_id)
  }
  return p
}

export async function addProduct(product: Partial<Product>): Promise<Product> {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    sku: product.sku || `RDK-${Date.now().toString().slice(-4)}`,
    slug: product.slug || `product-${Date.now()}`,
    name: product.name || 'Untitled Sample',
    description: product.description || '',
    category_id: product.category_id || inMemoryCategories[0].id,
    fabric: product.fabric || 'Cotton',
    composition: product.composition || '100% Cotton',
    colour_options: product.colour_options || ['Natural'],
    size_range: product.size_range || ['S', 'M', 'L'],
    customisation: product.customisation || 'Available upon request',
    moq: product.moq || '100 pcs',
    status: product.status || 'draft',
    featured: !!product.featured,
    public_preview: !!product.public_preview,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: product.images || [],
    tags: product.tags || [],
  }

  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await getSupabaseServiceClient()
      if (supabase) {
        const { data, error } = await supabase.from('products').insert(newProduct).select().single()
        if (!error && data) {
          return data as Product
        }
      }
    }
  } catch (err) {
    console.warn('Failed to insert into Supabase, storing in memory:', err)
  }

  inMemoryProducts.unshift(newProduct)
  return newProduct
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const idx = inMemoryProducts.findIndex((p) => p.id === id)
  if (idx === -1) return null

  inMemoryProducts[idx] = {
    ...inMemoryProducts[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = await getSupabaseServiceClient()
      if (supabase) {
        await supabase.from('products').update(updates).eq('id', id)
      }
    }
  } catch (err) {
    console.warn('Failed to update product in Supabase:', err)
  }

  return inMemoryProducts[idx]
}
