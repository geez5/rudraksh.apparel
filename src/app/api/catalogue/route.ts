import { NextRequest, NextResponse } from 'next/server'
import { getCategories, getProducts } from '@/lib/products'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const tag = searchParams.get('tag') || undefined
    const search = searchParams.get('search') || undefined

    const categories = await getCategories()
    const products = await getProducts({
      categorySlug: category,
      tag,
      search,
    })

    return NextResponse.json({
      categories,
      products,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch catalogue data' },
      { status: 500 }
    )
  }
}
