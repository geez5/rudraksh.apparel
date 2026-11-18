import { z } from 'zod'

export const catalogueRequestSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name').max(100),
  email: z.string().email('Please enter a valid business email address'),
  company_name: z.string().min(2, 'Please enter your company name').max(200),
  country: z.string().min(2, 'Please select your country'),
  business_type: z.enum([
    'fashion_brand',
    'retailer',
    'wholesaler',
    'distributor',
    'sourcing_agent',
    'private_label',
    'other',
  ]),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { error: () => ({ message: 'You must consent to receive communications' }) }),
  privacy_policy: z.literal(true, { error: () => ({ message: 'You must accept the privacy policy' }) }),
})

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Please enter your company name').max(200),
  country: z.string().min(2, 'Please select your country'),
  product_id: z.string().optional(),
  requested_quantity: z.string().max(100).optional(),
  message: z.string().min(10, 'Please provide more detail in your message').max(2000),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(200).optional(),
  enquiry_type: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().min(10, 'Please provide more detail in your message').max(2000),
})

export type CatalogueRequestInput = z.infer<typeof catalogueRequestSchema>
export type EnquiryInput = z.infer<typeof enquirySchema>
export type ContactInput = z.infer<typeof contactSchema>
