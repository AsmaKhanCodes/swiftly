-- Seed data for Swiftly demo
-- Password for all demo companies: demo123456
-- Hash generated with simple SHA-256 for demo purposes

-- Insert 6 demo companies
INSERT INTO companies (id, name, slug, description, brand_color, is_available, is_verified, average_rating) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'QuickDash', 'quickdash', 'Fast urban deliveries across the city. QuickDash specializes in rapid delivery for all categories with real-time tracking.', '#3B82F6', true, true, 4.7),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'GoParcel', 'goparcel', 'Parcel and document delivery specialists. Secure handling and reliable service for your important shipments.', '#14B8A6', true, true, 4.5),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'MediExpress', 'mediexpress', 'Medicine delivery experts. Fast and careful delivery of prescriptions, over-the-counter medicines, and health products.', '#EF4444', true, true, 4.8),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'FreshCart', 'freshcart', 'Grocery delivery from local markets. Fresh produce, dairy, and pantry staples delivered to your doorstep.', '#22C55E', true, true, 4.4),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'FoodRush', 'foodrush', 'Restaurant food pickup and delivery. Your favorite meals from local restaurants brought straight to you.', '#F97316', true, true, 4.6),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'SwiftCourier', 'swiftcourier', 'All-purpose courier service handling all delivery categories with professional service and competitive rates.', '#6366F1', true, true, 4.3);

-- Insert coverage areas (5-8 per company)
INSERT INTO coverage_areas (company_id, area_name, is_active) VALUES
  -- QuickDash
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Downtown', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Midtown', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Uptown', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Westside', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Eastside', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'North District', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'South District', true),
  -- GoParcel
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Downtown', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Midtown', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Westside', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Industrial Area', true),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'Business Park', true),
  -- MediExpress
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Downtown', true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Midtown', true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Uptown', true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'Medical District', true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'North District', true),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'University Area', true),
  -- FreshCart
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Downtown', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Midtown', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Westside', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Eastside', true),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'Suburbia', true),
  -- FoodRush
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Downtown', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Midtown', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Uptown', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Food District', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'University Area', true),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'Entertainment Zone', true),
  -- SwiftCourier
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Downtown', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Midtown', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Westside', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Eastside', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'North District', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'South District', true),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'Industrial Area', true);

-- Insert pricing
INSERT INTO pricing (company_id, category, base_fee, price_per_km, estimated_time_minutes) VALUES
  -- QuickDash (all categories)
  ('a1b2c3d4-0001-4000-8000-000000000001', 'grocery', 3.50, 1.50, 15),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'medicine', 3.00, 1.20, 12),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'food_pickup', 4.00, 1.80, 18),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'parcel', 5.00, 2.00, 20),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'documents', 4.50, 1.75, 15),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'other', 4.00, 1.50, 18),
  -- GoParcel (parcel, documents only)
  ('a1b2c3d4-0002-4000-8000-000000000002', 'parcel', 4.00, 1.50, 15),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'documents', 3.50, 1.25, 12),
  -- MediExpress (medicine only)
  ('a1b2c3d4-0003-4000-8000-000000000003', 'medicine', 2.50, 1.00, 10),
  -- FreshCart (grocery only)
  ('a1b2c3d4-0004-4000-8000-000000000004', 'grocery', 3.00, 1.25, 14),
  -- FoodRush (food_pickup only)
  ('a1b2c3d4-0005-4000-8000-000000000005', 'food_pickup', 3.50, 1.50, 16),
  -- SwiftCourier (all categories)
  ('a1b2c3d4-0006-4000-8000-000000000006', 'grocery', 4.00, 1.75, 18),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'medicine', 3.50, 1.50, 14),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'food_pickup', 4.50, 2.00, 20),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'parcel', 5.50, 2.25, 22),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'documents', 4.50, 1.75, 16),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'other', 4.50, 1.80, 19);

-- Insert company users (password: demo123456)
-- In production, use proper password hashing via Supabase auth
INSERT INTO company_users (company_id, email, password_hash, name) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'demo@quickdash.com', '$2a$10$demo_quickdash_hash_placeholder', 'QuickDash Admin'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'demo@goparcel.com', '$2a$10$demo_goparcel_hash_placeholder', 'GoParcel Admin'),
  ('a1b2c3d4-0003-4000-8000-000000000003', 'demo@mediexpress.com', '$2a$10$demo_mediexpress_hash_placeholder', 'MediExpress Admin'),
  ('a1b2c3d4-0004-4000-8000-000000000004', 'demo@freshcart.com', '$2a$10$demo_freshcart_hash_placeholder', 'FreshCart Admin'),
  ('a1b2c3d4-0005-4000-8000-000000000005', 'demo@foodrush.com', '$2a$10$demo_foodrush_hash_placeholder', 'FoodRush Admin'),
  ('a1b2c3d4-0006-4000-8000-000000000006', 'demo@swiftcourier.com', '$2a$10$demo_swiftcourier_hash_placeholder', 'SwiftCourier Admin');
