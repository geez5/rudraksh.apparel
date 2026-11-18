/**
 * RUDRAKSH Branded Transactional Email Templates
 * Responsive, elegant HTML formatting matching brand palette:
 * Ivory (#F5F1E9), Charcoal (#35332F), Sand (#D8C7B1), Olive (#70745C)
 */

interface BaseEmailProps {
  recipientName: string
  siteUrl?: string
}

function emailWrapper(content: string, siteUrl = 'https://rudraksh.in'): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RUDRAKSH</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F1E9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #35332F;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F1E9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FEFCF8; border: 1px solid #D8C7B1; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 36px 24px 20px; border-bottom: 1px solid #EFE9DF;">
              <h1 style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 400; letter-spacing: 5px; text-transform: uppercase; color: #35332F;">
                RUDRAKSH
              </h1>
              <p style="margin: 6px 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #7A6555;">
                Apparel Manufacturing & Export • India
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px; font-size: 14px; line-height: 1.7; color: #35332F;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #35332F; color: #D8C7B1; text-align: center; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF;">
                RUDRAKSH
              </p>
              <p style="margin: 0 0 12px; color: #D8C7B1;">
                Apparel Sourcing & Manufacturing • India<br/>
                Confidential B2B Garment Showroom
              </p>
              <p style="margin: 0; color: #A18A73; font-size: 10px;">
                © ${new Date().getFullYear()} RUDRAKSH. All rights reserved. This email is intended solely for registered business buyers.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export const emailTemplates = {
  // 1. Catalogue request received
  catalogueRequestReceived: (props: BaseEmailProps & { companyName: string }) => ({
    subject: 'Catalogue Access Application Received — RUDRAKSH',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Thank you for submitting an application to access the <strong>RUDRAKSH Digital Garment Catalogue</strong> on behalf of <strong>${props.companyName}</strong>.</p>
      <p>We have logged your application. To confirm your business email address and proceed with access validation, please look out for our verification link or verify using the separate security message.</p>
      <p>If you have urgent line sheet requirements, please contact our export desk at <a href="mailto:export@rudraksh.in" style="color: #70745C; text-decoration: underline;">export@rudraksh.in</a>.</p>
      <p style="margin-top: 32px;">With warm regards,<br/><strong>The Merchandising Desk</strong><br/>RUDRAKSH, India</p>
    `),
  }),

  // 2. Email verification
  emailVerification: (props: BaseEmailProps & { verifyUrl: string }) => ({
    subject: 'Confirm Your Email Address — RUDRAKSH Showroom',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Please confirm your business email address to proceed with access to our confidential digital garment showroom and line sheets.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${props.verifyUrl}" style="background-color: #35332F; color: #F5F1E9; padding: 14px 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: inline-block; font-weight: 600;">
          Verify Email & Access Catalogue
        </a>
      </div>
      <p style="font-size: 12px; color: #7A6555;">This link will remain active for 48 hours. If you did not initiate this request, you may safely ignore this message.</p>
      <p style="margin-top: 32px;">Sincerely,<br/><strong>RUDRAKSH Security Team</strong></p>
    `),
  }),

  // 3. Email verified
  emailVerified: (props: BaseEmailProps) => ({
    subject: 'Email Confirmed — RUDRAKSH',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Your business email has been confirmed successfully in our client directory.</p>
      <p>Thank you for your partnership interest in RUDRAKSH.</p>
      <p style="margin-top: 32px;">Sincerely,<br/><strong>RUDRAKSH Sourcing Team</strong></p>
    `),
  }),

  // 4. Catalogue access granted
  catalogueAccessGranted: (props: BaseEmailProps & { catalogueUrl: string; expiryDays?: number }) => ({
    subject: 'Access Granted: RUDRAKSH Private Digital Garment Showroom',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Your access application has been approved. You now have full permission to explore our private digital garment showroom, technical spec sheets, and sample archives.</p>
      <div style="background-color: #F5F1E9; padding: 16px; border-left: 3px solid #70745C; margin: 24px 0;">
        <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Access Privileges Active:</strong><br/>
        <span style="font-size: 12px; color: #5C5A54;">Valid for ${props.expiryDays || 30} days from today. Access includes all active silhouettes, fabric compositions, and direct specification inquiry tools.</span>
      </div>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${props.catalogueUrl}" style="background-color: #35332F; color: #F5F1E9; padding: 14px 32px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: inline-block; font-weight: 600;">
          Enter Digital Showroom
        </a>
      </div>
      <p style="font-size: 12px; color: #7A6555;">Please note that all photographs, tech pack details, and pattern motifs are proprietary and confidential to RUDRAKSH and its manufacturing partners.</p>
      <p style="margin-top: 32px;">Warm regards,<br/><strong>Commercial Relations Team</strong><br/>RUDRAKSH, India</p>
    `),
  }),

  // 5. Catalogue request pending approval
  catalogueRequestPending: (props: BaseEmailProps) => ({
    subject: 'Application Under Review — RUDRAKSH Showroom',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Thank you for verifying your email address. In order to protect proprietary design files and client brand exclusivity, our commercial team conducts a brief review of brand profiles.</p>
      <p>We review applications within 24 business hours. You will receive an immediate notification as soon as your access is activated.</p>
      <p style="margin-top: 32px;">Sincerely,<br/><strong>RUDRAKSH Merchandising Desk</strong></p>
    `),
  }),

  // 6. Catalogue access rejected
  catalogueAccessRejected: (props: BaseEmailProps & { reason?: string }) => ({
    subject: 'Update Regarding Your Catalogue Request — RUDRAKSH',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Thank you for your interest in RUDRAKSH apparel manufacturing. Following review of your application, we are unable to grant access to our digital line sheets at this time.</p>
      ${props.reason ? `<p><strong>Reason:</strong> ${props.reason}</p>` : ''}
      <p>If you believe this decision was made in error or if your sourcing requirements have evolved, please reply directly to this email with your company website or lookbook.</p>
      <p style="margin-top: 32px;">Respectfully,<br/><strong>RUDRAKSH Admissions</strong></p>
    `),
  }),

  // 7. Catalogue access expiring soon
  catalogueAccessExpiringSoon: (props: BaseEmailProps & { renewUrl: string; daysLeft: number }) => ({
    subject: `Notice: Your Showroom Access Expires in ${props.daysLeft} Days — RUDRAKSH`,
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>This is a courtesy notice that your 30-day access grant to the <strong>RUDRAKSH Digital Showroom</strong> will expire in <strong>${props.daysLeft} days</strong>.</p>
      <p>If you are actively evaluating production lines or preparing a tech pack for sampling, you can extend your session by clicking below:</p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${props.renewUrl}" style="background-color: #35332F; color: #F5F1E9; padding: 12px 28px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: inline-block;">
          Renew Showroom Access
        </a>
      </div>
      <p style="margin-top: 32px;">Best regards,<br/><strong>RUDRAKSH Account Services</strong></p>
    `),
  }),

  // 8. Catalogue access expired
  catalogueAccessExpired: (props: BaseEmailProps & { reapplyUrl: string }) => ({
    subject: 'Your Showroom Access Has Expired — RUDRAKSH',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Your access to the RUDRAKSH Digital Garment Catalogue has expired. To view new seasonal collections or submit further inquiries, please submit a quick access renewal application.</p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${props.reapplyUrl}" style="background-color: #35332F; color: #F5F1E9; padding: 12px 28px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; display: inline-block;">
          Re-Apply For Access
        </a>
      </div>
      <p style="margin-top: 32px;">Sincerely,<br/><strong>RUDRAKSH Account Services</strong></p>
    `),
  }),

  // 9. Product enquiry confirmation
  productEnquiryConfirmation: (props: BaseEmailProps & { productRef: string; quantity?: string }) => ({
    subject: `Specification Inquiry Logged: ${props.productRef} — RUDRAKSH`,
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Thank you for submitting a quotation and sampling inquiry regarding <strong>${props.productRef}</strong>.</p>
      <div style="background-color: #F5F1E9; padding: 16px; margin: 20px 0; border: 1px solid #D8C7B1;">
        <strong>Target Quantity:</strong> ${props.quantity || 'To be discussed'}<br/>
        <strong>Status:</strong> Assigned to Merchandising Manager
      </div>
      <p>Our technical team will review fabric inventory, mill availability, and FOB costing and contact you within 24 business hours.</p>
      <p style="margin-top: 32px;">Warm regards,<br/><strong>Merchandising & Sampling Desk</strong><br/>RUDRAKSH, India</p>
    `),
  }),

  // 10. Contact form confirmation
  contactConfirmation: (props: BaseEmailProps & { enquiryType: string }) => ({
    subject: 'Thank You for Contacting RUDRAKSH',
    html: emailWrapper(`
      <p style="margin-top: 0;">Dear ${props.recipientName},</p>
      <p>Thank you for contacting RUDRAKSH regarding <strong>${props.enquiryType}</strong>.</p>
      <p>Your message has been delivered to our export operations office. A representative will reach out to you within one business day.</p>
      <p style="margin-top: 32px;">With regards,<br/><strong>RUDRAKSH Sourcing Team</strong><br/>India</p>
    `),
  }),

  // 11. Administrator new-request notification
  adminNewRequest: (props: { buyerName: string; company: string; email: string; country: string; type: string }) => ({
    subject: `[ADMIN ALERT] New Catalogue Request: ${props.company} (${props.country})`,
    html: emailWrapper(`
      <h2 style="font-family: serif; color: #35332F; margin: 0 0 12px;">New Catalogue Access Application</h2>
      <p>A new fashion buyer has applied for digital showroom access:</p>
      <ul style="line-height: 1.8;">
        <li><strong>Name:</strong> ${props.buyerName}</li>
        <li><strong>Company:</strong> ${props.company}</li>
        <li><strong>Email:</strong> ${props.email}</li>
        <li><strong>Country:</strong> ${props.country}</li>
        <li><strong>Type:</strong> ${props.type}</li>
      </ul>
      <p>Log in to the <a href="https://rudraksh.in/admin/requests" style="color: #70745C; font-weight: bold;">Admin Dashboard</a> to review and approve.</p>
    `),
  }),

  // 12. Administrator new-enquiry notification
  adminNewEnquiry: (props: { clientName: string; company: string; product: string; quantity: string; message: string }) => ({
    subject: `[ADMIN ALERT] New Product Inquiry from ${props.company}`,
    html: emailWrapper(`
      <h2 style="font-family: serif; color: #35332F; margin: 0 0 12px;">New Sample / Product Inquiry</h2>
      <ul style="line-height: 1.8;">
        <li><strong>Client:</strong> ${props.clientName} (${props.company})</li>
        <li><strong>Product Reference:</strong> ${props.product}</li>
        <li><strong>Quantity:</strong> ${props.quantity}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <div style="background: #F5F1E9; padding: 12px; border: 1px solid #D8C7B1; font-size: 13px;">
        ${props.message.replace(/\n/g, '<br/>')}
      </div>
    `),
  }),
}
