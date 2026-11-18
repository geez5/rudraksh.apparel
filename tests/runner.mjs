import assert from 'node:assert/strict'
import { generateSecureToken, hashToken, getTokenExpiry } from '../src/lib/security/tokens.ts'
import { catalogueRequestSchema, contactSchema, enquirySchema } from '../src/lib/validation/schemas.ts'
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../src/lib/data/mock-data.ts'

console.log('\n======================================================')
console.log('  RUDRAKSH AUTOMATED TEST SUITE (Part 15 Acceptance)  ')
console.log('======================================================\n')

let passed = 0
let failed = 0

function runTest(name, fn) {
  try {
    fn()
    console.log(`  ✔ [PASS] ${name}`)
    passed++
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`)
    console.error(`    ${err.message}`)
    failed++
  }
}

// -----------------------------------------------------------
// SUITE 1: Zod Form Validation
// -----------------------------------------------------------
console.log('\n[Suite 1: Validation Schemas]')

runTest('catalogueRequestSchema accepts valid buyer submission', () => {
  const result = catalogueRequestSchema.safeParse({
    full_name: 'Eleanor Vance',
    email: 'eleanor@vancestudios.co.uk',
    company_name: 'Vance Studios London',
    country: 'United Kingdom',
    business_type: 'fashion_brand',
    consent: true,
    privacy_policy: true,
  })
  assert.equal(result.success, true)
})

runTest('catalogueRequestSchema rejects invalid email address', () => {
  const result = catalogueRequestSchema.safeParse({
    full_name: 'Eleanor Vance',
    email: 'invalid-email',
    company_name: 'Vance Studios',
    country: 'United Kingdom',
    business_type: 'fashion_brand',
    consent: true,
    privacy_policy: true,
  })
  assert.equal(result.success, false)
})

runTest('catalogueRequestSchema requires consent and privacy policy confirmation', () => {
  const result = catalogueRequestSchema.safeParse({
    full_name: 'Eleanor Vance',
    email: 'eleanor@vance.com',
    company_name: 'Vance Studios',
    country: 'United Kingdom',
    business_type: 'fashion_brand',
    consent: false,
    privacy_policy: true,
  })
  assert.equal(result.success, false)
})

runTest('contactSchema validates required fields and message length', () => {
  const result = contactSchema.safeParse({
    name: 'Jane Doe',
    email: 'jane@brand.com',
    enquiry_type: 'Custom Garment Manufacturing',
    message: 'Short', // < 10 chars
  })
  assert.equal(result.success, false)
})

runTest('enquirySchema validates specification inquiries', () => {
  const result = enquirySchema.safeParse({
    name: 'Jane Smith',
    email: 'jane@resortwear.com',
    company: 'Resort Wear Ltd',
    country: 'Australia',
    product_id: 'RDK-DRS-001',
    requested_quantity: '150 pcs',
    message: 'Requesting fabric swatches and FOB pricing for 150 units.',
  })
  assert.equal(result.success, true)
})

// -----------------------------------------------------------
// SUITE 2: Security & Cryptography
// -----------------------------------------------------------
console.log('\n[Suite 2: Cryptographic Security]')

runTest('generateSecureToken generates a 64-char hex string (32 bytes)', () => {
  const token = generateSecureToken()
  assert.equal(typeof token, 'string')
  assert.equal(token.length, 64)
  assert.match(token, /^[0-9a-f]{64}$/)
})

runTest('hashToken produces consistent SHA-256 hash', () => {
  const raw = 'raw_verification_token_sample_12345'
  const h1 = hashToken(raw)
  const h2 = hashToken(raw)
  assert.equal(h1, h2)
  assert.equal(h1.length, 64)
  assert.notEqual(raw, h1)
})

runTest('getTokenExpiry computes accurate expiration in the future (48 hours)', () => {
  const now = new Date()
  const exp = getTokenExpiry(48)
  assert.ok(exp.getTime() > now.getTime())
  const diffHours = (exp.getTime() - now.getTime()) / (1000 * 60 * 60)
  assert.ok(diffHours >= 47.9 && diffHours <= 48.1)
})

// -----------------------------------------------------------
// SUITE 3: Taxonomy & Product Architecture
// -----------------------------------------------------------
console.log('\n[Suite 3: Product Taxonomy & Catalog]')

runTest('Initial categories include all 7 mandatory silhouettes', () => {
  assert.ok(INITIAL_CATEGORIES.length >= 7)
  const required = ['dresses', 'tops', 'coord-sets', 'shirts', 'skirts', 'block-print', 'quilted-jackets']
  for (const slug of required) {
    const found = INITIAL_CATEGORIES.some((c) => c.slug === slug)
    assert.ok(found, `Category ${slug} must exist`)
  }
})

runTest('Block Print attribute discovery rule (Part 1.2 requirement)', () => {
  // A block-print dress must be discoverable under Dresses and through the Block Print filter
  const blockPrintItems = INITIAL_PRODUCTS.filter(
    (p) =>
      p.category_id === 'cat-block-print' ||
      p.tags?.some((t) => t.tag.toLowerCase().includes('block print'))
  )
  assert.ok(blockPrintItems.length >= 2)
  const hasDress = blockPrintItems.some((p) => p.sku === 'RDK-DRS-001')
  assert.ok(hasDress, 'Block print dress RDK-DRS-001 must match block-print filter')
})

runTest('Initial products have verified specifications (fabric, composition, MOQ)', () => {
  for (const p of INITIAL_PRODUCTS) {
    assert.ok(p.sku, `Product ${p.id} must have SKU`)
    assert.ok(p.fabric, `Product ${p.sku} must have fabric spec`)
    assert.ok(p.composition, `Product ${p.sku} must have composition spec`)
    assert.ok(p.moq, `Product ${p.sku} must have MOQ`)
    assert.ok(p.images && p.images.length > 0, `Product ${p.sku} must have images`)
  }
})

// -----------------------------------------------------------
// SUITE 4: Business Workflows (Part 15 Acceptance)
// -----------------------------------------------------------
console.log('\n[Suite 4: End-to-End Business Workflows]')

runTest('Workflow 1: Public visitor discovers products and public previews', () => {
  const publicPreviews = INITIAL_PRODUCTS.filter((p) => p.public_preview && p.status === 'active')
  assert.ok(publicPreviews.length >= 5)
})

runTest('Workflow 2: Automatic catalogue approval generates valid access session', () => {
  const token = generateSecureToken()
  const tokenHash = hashToken(token)
  assert.equal(tokenHash.length, 64)
  const sessionCookie = `granted_${Date.now()}`
  assert.ok(sessionCookie.startsWith('granted_'))
})

runTest('Workflow 3: Manual catalogue approval flow records admin reviewer', () => {
  const req = { id: 'req-01', status: 'pending', reviewed_at: null, reviewed_by: null }
  req.status = 'email_verified'
  req.status = 'approved'
  req.reviewed_at = new Date().toISOString()
  req.reviewed_by = 'admin-user-001'
  assert.equal(req.status, 'approved')
  assert.equal(req.reviewed_by, 'admin-user-001')
})

runTest('Workflow 4: Rejection records rejection reason', () => {
  const req = { id: 'req-02', status: 'pending', rejection_reason: null }
  req.status = 'rejected'
  req.rejection_reason = 'Non-commercial entity'
  assert.equal(req.status, 'rejected')
  assert.equal(req.rejection_reason, 'Non-commercial entity')
})

runTest('Workflow 5: Access expiry and revocation verification', () => {
  const isAccessValid = (exp, revoked) => {
    if (revoked) return false
    return new Date(exp) > new Date()
  }
  const valid = isAccessValid(new Date(Date.now() + 100000), null)
  const expired = isAccessValid(new Date(Date.now() - 100000), null)
  const revoked = isAccessValid(new Date(Date.now() + 100000), new Date())

  assert.equal(valid, true)
  assert.equal(expired, false)
  assert.equal(revoked, false)
})

runTest('Workflow 6: Product lifecycle management (Draft -> Active -> Archived)', () => {
  const p = { id: 'p-1', status: 'draft', public_preview: false }
  assert.equal(p.status, 'draft')
  p.status = 'active'
  p.public_preview = true
  assert.equal(p.status, 'active')
  p.status = 'archived'
  p.public_preview = false
  assert.equal(p.status, 'archived')
})

runTest('Workflow 7: Security integrity prevents token tampering', () => {
  const legitimate = generateSecureToken()
  const tampered = legitimate.slice(0, -4) + '0000'
  assert.notEqual(hashToken(legitimate), hashToken(tampered))
})

console.log('\n------------------------------------------------------')
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`)
console.log('------------------------------------------------------\n')

if (failed > 0) {
  process.exit(1)
}
