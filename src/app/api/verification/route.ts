import { NextRequest, NextResponse } from 'next/server'
import { hashToken } from '@/lib/security/tokens'
import { createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 })
    }

    const tokenHash = hashToken(token)
    let approvalMode: 'automatic' | 'manual' = 'automatic'
    let verified = false
    let buyerName = 'Valued Buyer'
    let buyerCompany = 'Fashion Partner'

    // If Supabase is connected
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = await createServiceClient()

        // 1. Fetch site settings to determine approval mode
        const { data: settingData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'catalogue_approval_mode')
          .single()

        if (settingData?.value) {
          approvalMode = typeof settingData.value === 'string'
            ? settingData.value.replace(/"/g, '') as 'automatic' | 'manual'
            : settingData.value
        }

        // 2. Look up token in verification_tokens
        const { data: tokenRecord, error: tokenErr } = await supabase
          .from('verification_tokens')
          .select('id, buyer_id, expires_at, consumed_at')
          .eq('token_hash', tokenHash)
          .single()

        if (tokenErr || !tokenRecord) {
          // Check fallback for testing
          return NextResponse.json(
            { error: 'Invalid or unrecognized verification token' },
            { status: 400 }
          )
        }

        if (tokenRecord.consumed_at) {
          return NextResponse.json(
            { error: 'This verification token has already been consumed' },
            { status: 400 }
          )
        }

        if (new Date(tokenRecord.expires_at) < new Date()) {
          return NextResponse.json(
            { error: 'This verification link has expired. Please submit a new request.' },
            { status: 400 }
          )
        }

        // 3. Mark token as consumed
        await supabase
          .from('verification_tokens')
          .update({ consumed_at: new Date().toISOString() })
          .eq('id', tokenRecord.id)

        // 4. Update buyer verification timestamp
        const { data: buyer } = await supabase
          .from('buyers')
          .update({ email_verified_at: new Date().toISOString() })
          .eq('id', tokenRecord.buyer_id)
          .select('full_name, company_name')
          .single()

        if (buyer) {
          buyerName = buyer.full_name
          buyerCompany = buyer.company_name
        }

        // 5. Update catalogue request status
        if (approvalMode === 'automatic') {
          await supabase
            .from('catalogue_requests')
            .update({ status: 'approved', reviewed_at: new Date().toISOString() })
            .eq('buyer_id', tokenRecord.buyer_id)

          // Create catalogue access record for 30 days
          const expiryDate = new Date()
          expiryDate.setDate(expiryDate.getDate() + 30)

          await supabase.from('catalogue_access').insert({
            buyer_id: tokenRecord.buyer_id,
            expires_at: expiryDate.toISOString(),
            access_reason: 'Automated email verification grant',
          })
        } else {
          await supabase
            .from('catalogue_requests')
            .update({ status: 'email_verified' })
            .eq('buyer_id', tokenRecord.buyer_id)
        }

        verified = true
      } catch (dbErr) {
        console.warn('Database verification error, using fallback:', dbErr)
      }
    } else {
      // In standalone/demo mode without live Supabase connection
      verified = true
    }

    if (!verified) {
      return NextResponse.json({ error: 'Could not verify token' }, { status: 400 })
    }

    // Set secure cookie if automatically approved
    const cookieStore = await cookies()
    if (approvalMode === 'automatic') {
      cookieStore.set('rudraksh_catalogue_access', `granted_${Date.now()}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })
    }

    return NextResponse.json({
      success: true,
      approval_mode: approvalMode,
      buyer_name: buyerName,
      company_name: buyerCompany,
      message:
        approvalMode === 'automatic'
          ? 'Email verified! Catalogue access granted.'
          : 'Email verified! Your request is pending brief administrative review.',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Verification failed' }, { status: 500 })
  }
}
