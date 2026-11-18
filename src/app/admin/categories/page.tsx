'use client'

import React, { useState } from 'react'
import { INITIAL_CATEGORIES } from '@/lib/data/mock-data'
import { Category } from '@/types'
import { Layers, Plus, Edit2, Archive, CheckCircle2, ArrowUpRight } from 'lucide-react'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [imagePath, setImagePath] = useState('')

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat)
    setName(cat.name)
    setSlug(cat.slug)
    setDescription(cat.description || '')
    setImagePath(cat.image_path || '')
    setModalOpen(true)
  }

  const handleCreate = () => {
    setEditingCategory(null)
    setName('')
    setSlug('')
    setDescription('')
    setImagePath('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800')
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, slug, description, image_path: imagePath, updated_at: new Date().toISOString() }
            : c
        )
      )
      setFeedback(`Category "${name}" updated successfully.`)
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        image_path: imagePath,
        sort_order: categories.length + 1,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setCategories([...categories, newCat])
      setFeedback(`New category "${name}" created.`)
    }
    setModalOpen(false)
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleToggleArchive = (id: string) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    )
    setFeedback('Category status updated.')
    setTimeout(() => setFeedback(null), 3000)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#70745C] font-semibold">
            Product Taxonomy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#35332F] font-light mt-1">
            Category Management
          </h1>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-[#35332F] text-[#F5F1E9] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#5C5A54] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-[#FEFCF8] border border-[#35332F]/10 overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#EFE9DF] border-b border-[#35332F]/10 text-[#35332F] uppercase tracking-wider text-[11px]">
              <th className="p-4">Sort</th>
              <th className="p-4">Cover Image</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#35332F]/5">
            {categories.map((cat, idx) => (
              <tr key={cat.id} className="hover:bg-[#F5F1E9]/50 transition-colors">
                <td className="p-4 font-mono font-bold text-[#7A6555]">0{cat.sort_order || idx + 1}</td>
                <td className="p-4">
                  <img
                    src={cat.image_path || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300'}
                    alt={cat.name}
                    className="w-14 h-16 object-cover bg-gray-100"
                  />
                </td>
                <td className="p-4 font-serif text-sm font-medium text-[#35332F]">{cat.name}</td>
                <td className="p-4 font-mono text-[#7A6555]">{cat.slug}</td>
                <td className="p-4 text-[#5C5A54] max-w-xs truncate">{cat.description || '—'}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                      cat.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {cat.active ? 'Active' : 'Archived'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="text-[11px] text-[#35332F] hover:text-[#7A6555] underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleArchive(cat.id)}
                    className="text-[11px] text-[#7A6555] hover:text-[#35332F] underline"
                  >
                    {cat.active ? 'Archive' : 'Restore'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#35332F]/60 backdrop-blur-xs">
          <div className="bg-[#FEFCF8] max-w-md w-full p-8 border border-[#35332F]/20 shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl text-[#35332F] font-light">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Category Name *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (!editingCategory) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                  }}
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Category Slug *
                </label>
                <input
                  required
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={imagePath}
                  onChange={(e) => setImagePath(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#35332F] font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#35332F]/20 p-2.5 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-[#35332F]/20 text-[#35332F] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#35332F] text-[#F5F1E9] uppercase font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
