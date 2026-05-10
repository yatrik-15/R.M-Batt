-- R.M BATT Signage Shop Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SIGNAGE PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS signage_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  image_public_id VARCHAR(255),
  thumbnail_url TEXT,
  medium_url TEXT,
  large_url TEXT,
  features JSONB,
  specifications JSONB,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CONTACTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- QUOTES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  project_type VARCHAR(100),
  message TEXT NOT NULL,
  budget VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON signage_products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON signage_products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON signage_products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to products table
CREATE TRIGGER update_signage_products_updated_at
  BEFORE UPDATE ON signage_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to quotes table
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================
INSERT INTO signage_products (title, category, description, price, in_stock, featured) VALUES
('LED Channel Letters', 'Illuminated Signs', 'Premium 3D LED channel letters for storefronts. Energy-efficient and weather-resistant.', 15000.00, true, true),
('Acrylic Nameplate', 'Nameplates', 'Elegant acrylic nameplate with laser-cut precision. Available in various sizes and colors.', 2500.00, true, false),
('Flex Banner', 'Outdoor Signage', 'High-quality flex banner printing for events and promotions. UV-resistant and durable.', 500.00, true, false),
('Neon Sign Board', 'Illuminated Signs', 'Eye-catching neon sign boards for restaurants and bars. Custom designs available.', 12000.00, true, true),
('ACP Board Signage', 'Outdoor Signage', 'Aluminum composite panel signage for corporate buildings. Weather-proof and long-lasting.', 8000.00, true, false),
('Glow Sign Board', 'Illuminated Signs', 'Backlit glow sign boards with LED lighting. Perfect for 24/7 visibility.', 10000.00, true, true);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- =====================================================
-- Enable RLS on tables
ALTER TABLE signage_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products"
  ON signage_products FOR SELECT
  USING (true);

-- Allow authenticated users to insert/update/delete products (for admin)
CREATE POLICY "Allow authenticated insert on products"
  ON signage_products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on products"
  ON signage_products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on products"
  ON signage_products FOR DELETE
  USING (auth.role() = 'authenticated');

-- Allow anyone to insert contacts and quotes (public forms)
CREATE POLICY "Allow public insert on contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert on quotes"
  ON quotes FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read contacts and quotes (admin only)
CREATE POLICY "Allow authenticated read on contacts"
  ON contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read on quotes"
  ON quotes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on contacts"
  ON contacts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on quotes"
  ON quotes FOR UPDATE
  USING (auth.role() = 'authenticated');
