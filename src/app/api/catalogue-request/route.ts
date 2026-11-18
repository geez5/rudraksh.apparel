import { NextRequest, NextResponse } from 'next/server'
import { catalogueRequestSchema } from '@/lib/validation/schemas'
import { normalizeEmail } from '@/lib/utils'
import { generateSecureToken, hashToken, getTokenExpiry } from '@/lib/security/tokens'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = catalogueRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { full_name, email, company_name, country, business_type, message } = validation.data
    const normalizedEmail = normalizeEmail(email)

    // Generate secure token and its hash
    const rawToken = generateSecureToken()
    const tokenHash = hashToken(rawToken)
    const tokenExpiry = getTokenExpiry(48) // 48 hours validity

    let buyerId = `buyer-${Date.now()}`

    // Database operations with Supabase (if configured)
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = await createServiceClient()

        // 1. Check or upsert buyer
        const { data: existingBuyer } = await supabase
          .from('buyers')
          .select('id, email_verified_at')
          .eq('email', normalizedEmail)
          .single()

        if (existingBuyer) {
          buyerId = existingBuyer.id
          await supabase
            .from('buyers')
            .update({
              full_name,
              company_name,
              country,
              business_type,
            })
            .eq('id', buyerId)
        } else {
          const { data: newBuyer, error: buyerErr } = await supabase
            .from('buyers')
            .insert({
              full_name,
              email: normalizedEmail,
              company_name,
              country,
              business_type,
            })
            .select()
            .single()

          if (!buyerErr && newBuyer) {
            buyerId = newBuyer.id
          }
        }

        // 2. Insert catalogue request
        await supabase.from('catalogue_requests').insert({
          buyer_id: buyerId,
          status: 'pending',
          message: message || null,
        })

        // 3. Store only token hash
        await supabase.from('verification_tokens').insert({
          buyer_id: buyerId,
          token_hash: tokenHash,
          expires_at: tokenExpiry.toISOString(),
        })
      } catch (dbErr) {
        console.warn('Database operations skipped/failed in dev:', dbErr)
      }
    }

    // Build verification URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const verificationUrl = `${siteUrl}/auth/verify?token=${rawToken}&email=${encodeURIComponent(normalizedEmail)}`

    // Dispatch Verification Email via Resend if key exists
    let emailSent = false
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'

        await resend.emails.send({
          from: emailFrom,
          to: normalizedEmail,
          subject: 'Verify your email to access RUDRAKSH Digital Showroom',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px 24px; color: #35332F; background-color: #FEFCF8;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; letter-spacing: 4px; text-transform: uppercase; margin: 0; color: #35332F;">RUDRAKSH</h1>
                <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #7A6555; margin-top: 4px;">Apparel Manufacturing & Export • India</p>
              </div>
              <hr style="border: none; border-top: 1px solid #D8C7B1; margin: 24px 0;" />
              <p style="font-size: 15px; line-height: 1.6;">Dear ${full_name},</p>
              <p style="font-size: 15px; line-height: 1.6;">Thank you for requesting access to the <strong>RUDRAKSH Digital Garment Catalogue & Showroom</strong> on behalf of <strong>${company_name}</strong>.</p>
              <p style="font-size: 15px; line-height: 1.6;">To safeguard our confidential wholesale line sheets and proprietary pattern archives, please confirm your business email address by clicking the link below:</p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationUrl}" style="background-color: #35332F; color: #F5F1E9; padding: 14px 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: inline-block; font-weight: 600;">
                  Verify Email & Access Showroom
                </a>
              </div>
              <p style="font-size: 12px; color: #5C5A54; line-height: 1.5;">This verification link will remain active for 48 hours. If you did not make this request, you may safely disregard this message.</p>
              <hr style="border: none; border-top: 1px solid #D8C7B1; margin: 28px 0;" />
              <p style="font-size: 11px; color: #7A6555; text-align: center;">
                RUDRAKSH Sourcing & Manufacturing • India<br/>
                Confidential B2B Showroom
              </p>
            </div>
          `,
        })
        emailSent = true
      } catch (mailError) {
        console.warn('Resend verification dispatch error:', mailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Catalogue request registered. Please check your email to verify your address.',
      // In development mode when Resend is not configured, we return the verification link directly so testing is frictionless!
      dev_verification_url: !emailSent ? verificationUrl : undefined,
    })
  } catch (err: any) {
    console.error('Catalogue request error:', err)
    return NextResponse.json(
      { error: err?.message || 'Server error processing catalogue request' },
      { status: 500 }
    )
  }
}
