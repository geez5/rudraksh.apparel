import { NextRequest, NextResponse } from 'next/server'
import { addProduct, updateProduct, getProducts } from '@/lib/products'
import { slugify } from '@/lib/utils'

export async function GET() {
  const products = await getProducts()
  return NextResponse.json({ products })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.name || !body.sku) {
      return NextResponse.json({ error: 'Name and SKU are required' }, { status: 400 })
    }

    const slug = body.slug || slugify(body.name)

    const product = await addProduct({
      ...body,
      slug,
      status: body.status || 'active',
      public_preview: body.public_preview ?? true,
    })

    return NextResponse.json({ success: true, product })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to create product' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const product = await updateProduct(id, updates)
    return NextResponse.json({ success: true, product })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update product' }, { status: 500 })
  }
}
