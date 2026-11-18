'use client'

import React, { useState, useEffect } from 'react'
import { Product, Category } from '@/types'
import { Plus, Search, Edit2, Archive, Check, Eye, EyeOff, X, ArrowUpRight, CheckCircle2 } from 'lucide-react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: '',
    fabric: '',
    composition: '',
    moq: '100 pcs',
    colour_options: 'Indigo, Ivory, Rust',
    size_range: 'XS, S, M, L, XL',
    customisation: 'Custom print placement, brand labelling upon request',
    description: '',
    image_url: '',
    status: 'active' as const,
    featured: false,
    public_preview: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const pRes = await fetch('/api/admin/products')
      const pData = await pRes.json()
      if (pData.products) setProducts(pData.products)

      // Fetch categories
      const cRes = await fetch('/api/catalogue')
      // Fallback categories if needed
      setCategories([
        { id: 'cat-dresses', name: 'Dresses', slug: 'dresses', description: '', image_path: '', sort_order: 1, active: true, created_at: '', updated_at: '' },
        { id: 'cat-tops', name: 'Tops', slug: 'tops', description: '', image_path: '', sort_order: 2, active: true, created_at: '', updated_at: '' },
        { id: 'cat-coord-sets', name: 'Co-ord Sets', slug: 'coord-sets', description: '', image_path: '', sort_order: 3, active: true, created_at: '', updated_at: '' },
        { id: 'cat-shirts', name: 'Shirts', slug: 'shirts', description: '', image_path: '', sort_order: 4, active: true, created_at: '', updated_at: '' },
        { id: 'cat-skirts', name: 'Skirts', slug: 'skirts', description: '', image_path: '', sort_order: 5, active: true, created_at: '', updated_at: '' },
        { id: 'cat-block-print', name: 'Block Print', slug: 'block-print', description: '', image_path: '', sort_order: 6, active: true, created_at: '', updated_at: '' },
        { id: 'cat-quilted-jackets', name: 'Quilted Jackets', slug: 'quilted-jackets', description: '', image_path: '', sort_order: 7, active: true, created_at: '', updated_at: '' },
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      sku: `RDK-NEW-${Math.floor(100 + Math.random() * 900)}`,
      category_id: categories[0]?.id || 'cat-dresses',
      fabric: 'Fine Cotton Cambric',
      composition: '100% Cotton',
      moq: '100 pcs',
      colour_options: 'Indigo, Ivory, Olive',
      size_range: 'XS, S, M, L, XL',
      customisation: 'Custom print placement, brand labelling',
      description: 'Handcrafted sample silhouette for international private label collections.',
      image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
      status: 'active',
      featured: false,
      public_preview: true,
    })
    setModalOpen(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      colour_options: formData.colour_options.split(',').map((s) => s.trim()),
      size_range: formData.size_range.split(',').map((s) => s.trim()),
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: editingProduct?.id || 'new',
          storage_path: formData.image_url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
          alt_text: formData.name,
          image_type: 'front' as const,
          sort_order: 1,
          created_at: new Date().toISOString(),
        },
      ],
    }

    try {
      if (editingProduct) {
        await fetch('/api/admin/products', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...payload }),
        })
        setFeedback('Product updated successfully')
      } else {
        await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        setFeedback('Product created and published')
      }

      setModalOpen(false)
      fetchData()
      setTimeout(() => setFeedback(null), 3000)
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'active' ? 'archived' : 'active'
    await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product.id, status: nextStatus }),
    })
    setFeedback(`Product status set to ${nextStatus}`)
    fetchData()
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleTogglePreview = async (product: Product) => {
    await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product.id, public_preview: !product.public_preview }),
    })
    setFeedback(`Public preview updated`)
    fetchData()
    setTimeout(() => setFeedback(null), 3000)
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.fabric?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
            Catalogue Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
            Garment Products & Specifications
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#5C5A54] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#FEFCF8] p-4 border border-[#35332F]/10">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#7A6555] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by SKU, product name..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F5F1E9] border border-[#35332F]/20 text-xs outline-none"
          />
        </div>
        <p className="text-xs text-[#7A6555] font-sans">
          Showing {filtered.length} of {products.length} garments
        </p>
      </div>

      {/* Products Table */}
      <div className="bg-[#FEFCF8] border border-[#35332F]/10 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EFE9DF] border-b border-[#35332F]/10 text-[#35332F] uppercase tracking-wider text-[11px]">
              <th className="p-4">Sample</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Fabric</th>
              <th className="p-4">MOQ</th>
              <th className="p-4">Public Preview</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#35332F]/5">
            {filtered.map((product) => {
              const image = product.images?.[0]?.storage_path || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400'
              return (
                <tr key={product.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                  <td className="p-4">
                    <img
                      src={image}
                      alt={product.name}
                      className="w-12 h-16 object-cover bg-gray-100"
                    />
                  </td>
                  <td className="p-4 font-mono font-medium text-[#7A6555]">{product.sku}</td>
                  <td className="p-4">
                    <p className="font-serif text-sm font-medium text-[#35332F]">{product.name}</p>
                    <p className="text-[10px] text-[#70745C] uppercase tracking-wider mt-0.5">
                      {product.category?.name || 'Womenswear'}
                    </p>
                  </td>
                  <td className="p-4 text-[#5C5A54]">{product.fabric || '—'}</td>
                  <td className="p-4 text-[#5C5A54]">{product.moq || '100 pcs'}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePreview(product)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-none ${
                        product.public_preview
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}
                    >
                      {product.public_preview ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{product.public_preview ? 'Visible' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className="text-[11px] text-[#7A6555] hover:text-[#35332F] underline p-1"
                    >
                      {product.status === 'active' ? 'Archive' : 'Restore'}
                    </button>
                    <a
                      href={`/catalogue/${product.slug}`}
                      target="_blank"
                      className="text-[11px] text-[#35332F] hover:text-[#7A6555] p-1 inline-flex items-center gap-0.5"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#35332F]/60 backdrop-blur-xs">
          <div className="bg-[#FEFCF8] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-[#35332F]/20 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#35332F]/60 hover:text-[#35332F]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#35332F] font-light mb-6">
              {editingProduct ? 'Edit Product Specifications' : 'Add New Garment Prototype'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Product Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Linen Camp Collar Shirt"
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    SKU Code *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Production MOQ
                  </label>
                  <input
                    type="text"
                    value={formData.moq}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Fabric Type
                  </label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="e.g. 60s Organic Cotton Cambric"
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                    Composition
                  </label>
                  <input
                    type="text"
                    value={formData.composition}
                    onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                    placeholder="e.g. 100% Cotton"
                    className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Primary Photograph URL (Unsplash or Supabase Storage)
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.public_preview}
                    onChange={(e) => setFormData({ ...formData, public_preview: e.target.checked })}
                    className="accent-[#35332F]"
                  />
                  <span>Show in Public Showcase</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[#35332F]"
                  />
                  <span>Mark as Featured Sample</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-[#35332F]/20 text-[#35332F] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-[#35332F] text-[#F5F1E9] uppercase tracking-wider font-semibold hover:bg-[#5C5A54]"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
