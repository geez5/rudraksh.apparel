import { NextRequest, NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validation/schemas'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = enquirySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid enquiry submission', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, company, country, product_id, requested_quantity, message } = validation.data

    // Persist to Supabase if configured
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = await createServiceClient()
        await supabase.from('enquiries').insert({
          contact_name: name,
          contact_email: email,
          contact_company: company,
          contact_country: country,
          product_id: product_id || null,
          requested_quantity: requested_quantity || null,
          message,
          status: 'new',
        })
      } catch (dbErr) {
        console.warn('Database error persisting enquiry:', dbErr)
      }
    }

    // Send emails via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'
        const adminEmail = process.env.EMAIL_ADMIN || 'admin@rudraksh.in'

        // Admin notification
        await resend.emails.send({
          from: emailFrom,
          to: adminEmail,
          subject: `[RUDRAKSH] Product Specification Request from ${name} (${company})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #35332F;">
              <h2 style="font-family: serif; color: #35332F; border-bottom: 1px solid #D8C7B1; padding-bottom: 10px;">Product Specification & Quotation Request</h2>
              <p><strong>Client:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Country:</strong> ${country}</p>
              <p><strong>Product ID / SKU:</strong> ${product_id || 'General line sheet enquiry'}</p>
              <p><strong>Target Quantity:</strong> ${requested_quantity || 'Not specified'}</p>
              <p><strong>Message / Customisation Notes:</strong></p>
              <div style="background: #F5F1E9; padding: 14px; border-radius: 4px; font-size: 14px;">${message.replace(/\n/g, '<br/>')}</div>
            </div>
          `,
        })

        // Buyer confirmation
        await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: 'We have received your specification request — RUDRAKSH',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #35332F; background: #FEFCF8;">
              <h2 style="font-family: serif; color: #35332F; margin: 0;">RUDRAKSH</h2>
              <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; color: #70745C;">Apparel Manufacturing & Export • India</p>
              <hr style="border: none; border-top: 1px solid #D8C7B1; margin: 20px 0;" />
              <p>Dear ${name},</p>
              <p>Thank you for submitting a specification inquiry for <strong>${product_id || 'our sample collection'}</strong>.</p>
              <p>Our technical sampling team is reviewing fabric availability, minimums, and costing. A merchandising manager will reach out to you within 24 business hours.</p>
              <div style="margin: 24px 0; padding: 16px; background: #F5F1E9; font-size: 13px;">
                <strong>Summary of your request:</strong><br/>
                Quantity: ${requested_quantity || 'To be discussed'}<br/>
                Company: ${company}
              </div>
              <p style="margin-top: 30px; font-size: 13px; color: #7A6555;">With warm regards,<br/><strong>The Merchandising Desk</strong><br/>RUDRAKSH, India</p>
            </div>
          `,
        })
      } catch (mailErr) {
        console.warn('Resend enquiry email dispatch error:', mailErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your specification request has been submitted. Our merchandising team will respond shortly.',
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}
