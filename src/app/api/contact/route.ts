import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation/schemas'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form input', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, company, enquiry_type, message } = result.data

    // Persist enquiry to Supabase if configured
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const supabase = await createServiceClient()
        await supabase.from('enquiries').insert({
          contact_name: name,
          contact_email: email,
          contact_company: company || null,
          contact_country: 'Inquiry',
          requested_quantity: enquiry_type,
          message: `[Enquiry Type: ${enquiry_type}] ${message}`,
          status: 'new',
        })
      }
    } catch (dbError) {
      console.warn('Database insert failed, continuing to email:', dbError)
    }

    // Send email via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'
        const adminEmail = process.env.EMAIL_ADMIN || 'admin@rudraksh.in'

        // Notify admin
        await resend.emails.send({
          from: emailFrom,
          to: adminEmail,
          subject: `[RUDRAKSH] New General Enquiry: ${enquiry_type} from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #35332F;">
              <h2 style="font-family: serif; color: #35332F; border-bottom: 1px solid #D8C7B1; padding-bottom: 10px;">New Business Enquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Type:</strong> ${enquiry_type}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #F5F1E9; padding: 15px; border-radius: 4px;">${message.replace(/\n/g, '<br/>')}</div>
            </div>
          `,
        })

        // Send confirmation to user
        await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: 'Thank you for contacting RUDRAKSH',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #35332F; background: #FEFCF8;">
              <h2 style="font-family: serif; color: #35332F;">RUDRAKSH</h2>
              <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 11px; color: #70745C;">Apparel Manufacturing & Export</p>
              <hr style="border: none; border-top: 1px solid #D8C7B1; margin: 20px 0;" />
              <p>Dear ${name},</p>
              <p>Thank you for reaching out to RUDRAKSH. We have received your inquiry regarding <strong>${enquiry_type}</strong>.</p>
              <p>Our international sourcing and sampling team is reviewing your details and will get back to you within 24 business hours.</p>
              <p style="margin-top: 30px; font-size: 13px; color: #7A6555;">With regards,<br/><strong>RUDRAKSH Sourcing Team</strong><br/>India</p>
            </div>
          `,
        })
      } catch (emailError) {
        console.warn('Resend email failed:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received. Our team will contact you shortly.',
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
