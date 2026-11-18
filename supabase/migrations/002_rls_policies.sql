-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogue_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogue_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Categories: public read for active categories, admin write
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (active = true);
CREATE POLICY "Service role manages categories" ON categories FOR ALL USING (auth.role() = 'service_role');

-- Products: public read for public_preview only, service role for all
CREATE POLICY "Anyone can view public preview products" ON products FOR SELECT USING (status = 'active' AND public_preview = true);
CREATE POLICY "Service role manages products" ON products FOR ALL USING (auth.role() = 'service_role');

-- Product images: follow product visibility
CREATE POLICY "Anyone can view images of public products" ON product_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = product_images.product_id AND products.status = 'active' AND products.public_preview = true
  ));
CREATE POLICY "Service role manages product images" ON product_images FOR ALL USING (auth.role() = 'service_role');

-- Product tags: follow product visibility
CREATE POLICY "Anyone can view tags of public products" ON product_tags FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = product_tags.product_id AND products.status = 'active' AND products.public_preview = true
  ));
CREATE POLICY "Service role manages product tags" ON product_tags FOR ALL USING (auth.role() = 'service_role');

-- Buyers: no public access, only service role
CREATE POLICY "Service role manages buyers" ON buyers FOR ALL USING (auth.role() = 'service_role');

-- Catalogue requests: service role only
CREATE POLICY "Service role manages catalogue requests" ON catalogue_requests FOR ALL USING (auth.role() = 'service_role');

-- Verification tokens: service role only (never expose hashes)
CREATE POLICY "Service role manages verification tokens" ON verification_tokens FOR ALL USING (auth.role() = 'service_role');

-- Catalogue access: service role only
CREATE POLICY "Service role manages catalogue access" ON catalogue_access FOR ALL USING (auth.role() = 'service_role');

-- Enquiries: service role only
CREATE POLICY "Service role manages enquiries" ON enquiries FOR ALL USING (auth.role() = 'service_role');

-- Admin users: service role only
CREATE POLICY "Service role manages admin users" ON admin_users FOR ALL USING (auth.role() = 'service_role');

-- Site settings: public read, service role write
CREATE POLICY "Anyone can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Service role manages site settings" ON site_settings FOR ALL USING (auth.role() = 'service_role');

-- Audit logs: service role only
CREATE POLICY "Service role manages audit logs" ON audit_logs FOR ALL USING (auth.role() = 'service_role');
