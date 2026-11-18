import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(typeof date === 'string' ? new Date(date) : date)
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function generateSKU(category: string, index: number): string {
  const prefix = category.slice(0, 3).toUpperCase()
  const num = String(index).padStart(4, '0')
  return `RDK-${prefix}-${num}`
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function formatBusinessType(type: string): string {
  const map: Record<string, string> = {
    fashion_brand: 'Fashion Brand',
    retailer: 'Retailer',
    wholesaler: 'Wholesaler',
    distributor: 'Distributor',
    sourcing_agent: 'Sourcing Agent',
    private_label: 'Private Label Business',
    other: 'Other',
  }
  return map[type] || type
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
