-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  brand_color TEXT NOT NULL DEFAULT '#4F46E5',
  is_available BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  average_rating DECIMAL(2,1),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Coverage areas
CREATE TABLE coverage_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  area_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pricing
CREATE TABLE pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('grocery','medicine','food_pickup','parcel','documents','other')),
  base_fee DECIMAL(10,2) NOT NULL,
  price_per_km DECIMAL(10,2) NOT NULL,
  estimated_time_minutes INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, category)
);

-- Delivery requests
CREATE TABLE delivery_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  pickup_location TEXT NOT NULL,
  destination TEXT,
  category TEXT NOT NULL,
  shopping_list TEXT NOT NULL,
  notes TEXT,
  phone_number TEXT NOT NULL,
  estimated_fee DECIMAL(10,2) NOT NULL,
  estimated_time INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Company users (for auth)
CREATE TABLE company_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER coverage_areas_updated_at BEFORE UPDATE ON coverage_areas FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER pricing_updated_at BEFORE UPDATE ON pricing FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER delivery_requests_updated_at BEFORE UPDATE ON delivery_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER company_users_updated_at BEFORE UPDATE ON company_users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_pricing_company_category ON pricing(company_id, category);
CREATE INDEX idx_requests_company_status ON delivery_requests(company_id, status);
CREATE INDEX idx_requests_created ON delivery_requests(created_at DESC);
CREATE INDEX idx_coverage_areas_company ON coverage_areas(company_id);
CREATE INDEX idx_company_users_email ON company_users(email);
