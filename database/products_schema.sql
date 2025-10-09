-- ============================================
-- DalSi AI Products Database Schema
-- Complete integrated solution with analytics
-- ============================================

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'text', 'vision', 'media'
  model_type VARCHAR(50) NOT NULL, -- 'dalsi-ai', 'dalsi-ai-vi', 'dalsi-ai-vd'
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  color_class VARCHAR(50) NOT NULL,
  gradient_class VARCHAR(100) NOT NULL,
  cta_primary VARCHAR(100) NOT NULL,
  cta_secondary VARCHAR(100) NOT NULL,
  cta_title TEXT NOT NULL,
  cta_description TEXT NOT NULL,
  cta_final VARCHAR(100) NOT NULL,
  ai_indicator VARCHAR(100) NOT NULL,
  features_title VARCHAR(200) NOT NULL,
  features_subtitle TEXT NOT NULL,
  use_cases_title VARCHAR(200) NOT NULL,
  pricing_tier VARCHAR(50), -- 'free', 'pro', 'enterprise'
  base_price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  launch_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Stats (for hero section)
CREATE TABLE IF NOT EXISTS product_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  stat_value VARCHAR(50) NOT NULL,
  stat_label VARCHAR(100) NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Features
CREATE TABLE IF NOT EXISTS product_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  icon_name VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  is_highlighted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Use Cases
CREATE TABLE IF NOT EXISTS product_use_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  icon_name VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  target_audience VARCHAR(100),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Benefits
CREATE TABLE IF NOT EXISTS product_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Mockup Lines (for visual design)
CREATE TABLE IF NOT EXISTS product_mockup_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  width_percentage VARCHAR(10) NOT NULL, -- '100%', '80%', etc.
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product Analytics
CREATE TABLE IF NOT EXISTS product_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id VARCHAR(100),
  event_type VARCHAR(50) NOT NULL, -- 'view', 'cta_click', 'feature_click', 'trial_start'
  event_data JSONB,
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Product Interests (for personalization)
CREATE TABLE IF NOT EXISTS user_product_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  interest_score INTEGER DEFAULT 0, -- 0-100
  last_viewed_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  trial_started BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Product Recommendations Cache
CREATE TABLE IF NOT EXISTS product_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recommended_products JSONB NOT NULL, -- Array of product IDs with scores
  generated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '1 hour'
);

-- ============================================
-- VIEWS
-- ============================================

-- Complete Product View (with all related data)
CREATE OR REPLACE VIEW products_complete AS
SELECT 
  p.*,
  json_agg(DISTINCT jsonb_build_object(
    'value', ps.stat_value,
    'label', ps.stat_label,
    'order', ps.display_order
  ) ORDER BY ps.display_order) FILTER (WHERE ps.id IS NOT NULL) as stats,
  json_agg(DISTINCT jsonb_build_object(
    'icon', pf.icon_name,
    'title', pf.title,
    'description', pf.description,
    'highlighted', pf.is_highlighted,
    'order', pf.display_order
  ) ORDER BY pf.display_order) FILTER (WHERE pf.id IS NOT NULL) as features,
  json_agg(DISTINCT jsonb_build_object(
    'icon', puc.icon_name,
    'title', puc.title,
    'description', puc.description,
    'audience', puc.target_audience,
    'order', puc.display_order
  ) ORDER BY puc.display_order) FILTER (WHERE puc.id IS NOT NULL) as use_cases,
  json_agg(DISTINCT jsonb_build_object(
    'title', pb.title,
    'description', pb.description,
    'order', pb.display_order
  ) ORDER BY pb.display_order) FILTER (WHERE pb.id IS NOT NULL) as benefits,
  json_agg(DISTINCT jsonb_build_object(
    'width', pml.width_percentage,
    'order', pml.display_order
  ) ORDER BY pml.display_order) FILTER (WHERE pml.id IS NOT NULL) as mockup_lines
FROM products p
LEFT JOIN product_stats ps ON p.id = ps.product_id
LEFT JOIN product_features pf ON p.id = pf.product_id
LEFT JOIN product_use_cases puc ON p.id = puc.product_id
LEFT JOIN product_benefits pb ON p.id = pb.product_id
LEFT JOIN product_mockup_lines pml ON p.id = pml.product_id
WHERE p.is_active = true
GROUP BY p.id;

-- Product Analytics Summary
CREATE OR REPLACE VIEW product_analytics_summary AS
SELECT 
  p.id as product_id,
  p.name as product_name,
  p.category,
  COUNT(DISTINCT pa.session_id) as unique_views,
  COUNT(CASE WHEN pa.event_type = 'view' THEN 1 END) as total_views,
  COUNT(CASE WHEN pa.event_type = 'cta_click' THEN 1 END) as cta_clicks,
  COUNT(CASE WHEN pa.event_type = 'trial_start' THEN 1 END) as trial_starts,
  ROUND(
    COUNT(CASE WHEN pa.event_type = 'trial_start' THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(CASE WHEN pa.event_type = 'view' THEN 1 END), 0) * 100, 
    2
  ) as conversion_rate,
  MAX(pa.created_at) as last_activity
FROM products p
LEFT JOIN product_analytics pa ON p.id = pa.product_id
GROUP BY p.id, p.name, p.category;

-- Trending Products
CREATE OR REPLACE VIEW trending_products AS
SELECT 
  p.id,
  p.name,
  p.slug,
  p.category,
  COUNT(pa.id) as activity_count,
  COUNT(DISTINCT pa.session_id) as unique_visitors
FROM products p
JOIN product_analytics pa ON p.id = pa.product_id
WHERE pa.created_at >= NOW() - INTERVAL '7 days'
GROUP BY p.id, p.name, p.slug, p.category
ORDER BY activity_count DESC
LIMIT 10;

-- Smart Recommendations (based on user behavior)
CREATE OR REPLACE VIEW smart_product_recommendations AS
SELECT 
  upi.user_id,
  p.id as product_id,
  p.name,
  p.slug,
  p.category,
  upi.interest_score,
  CASE 
    WHEN upi.trial_started THEN 'tried'
    WHEN upi.view_count > 3 THEN 'highly_interested'
    WHEN upi.view_count > 0 THEN 'interested'
    ELSE 'new'
  END as interest_level
FROM user_product_interests upi
JOIN products p ON upi.product_id = p.id
WHERE p.is_active = true
ORDER BY upi.interest_score DESC;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to track product view
CREATE OR REPLACE FUNCTION track_product_view(
  p_product_slug VARCHAR,
  p_user_id UUID DEFAULT NULL,
  p_session_id VARCHAR DEFAULT NULL,
  p_referrer VARCHAR DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_product_id UUID;
BEGIN
  -- Get product ID
  SELECT id INTO v_product_id FROM products WHERE slug = p_product_slug;
  
  IF v_product_id IS NOT NULL THEN
    -- Insert analytics event
    INSERT INTO product_analytics (
      product_id, user_id, session_id, event_type, referrer
    ) VALUES (
      v_product_id, p_user_id, p_session_id, 'view', p_referrer
    );
    
    -- Update user interests if user is logged in
    IF p_user_id IS NOT NULL THEN
      INSERT INTO user_product_interests (
        user_id, product_id, view_count, last_viewed_at, interest_score
      ) VALUES (
        p_user_id, v_product_id, 1, NOW(), 10
      )
      ON CONFLICT (user_id, product_id) DO UPDATE SET
        view_count = user_product_interests.view_count + 1,
        last_viewed_at = NOW(),
        interest_score = LEAST(user_product_interests.interest_score + 5, 100),
        updated_at = NOW();
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to track CTA click
CREATE OR REPLACE FUNCTION track_cta_click(
  p_product_slug VARCHAR,
  p_user_id UUID DEFAULT NULL,
  p_session_id VARCHAR DEFAULT NULL,
  p_cta_type VARCHAR DEFAULT 'primary'
)
RETURNS VOID AS $$
DECLARE
  v_product_id UUID;
BEGIN
  SELECT id INTO v_product_id FROM products WHERE slug = p_product_slug;
  
  IF v_product_id IS NOT NULL THEN
    INSERT INTO product_analytics (
      product_id, user_id, session_id, event_type, event_data
    ) VALUES (
      v_product_id, p_user_id, p_session_id, 'cta_click', 
      jsonb_build_object('cta_type', p_cta_type)
    );
    
    IF p_user_id IS NOT NULL THEN
      UPDATE user_product_interests SET
        click_count = click_count + 1,
        interest_score = LEAST(interest_score + 15, 100),
        updated_at = NOW()
      WHERE user_id = p_user_id AND product_id = v_product_id;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get related products
CREATE OR REPLACE FUNCTION get_related_products(
  p_product_slug VARCHAR,
  p_limit INTEGER DEFAULT 3
)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  description TEXT,
  category VARCHAR
) AS $$
DECLARE
  v_category VARCHAR;
BEGIN
  -- Get current product category
  SELECT category INTO v_category FROM products WHERE slug = p_product_slug;
  
  -- Return products from same category
  RETURN QUERY
  SELECT p.id, p.name, p.slug, p.description, p.category
  FROM products p
  WHERE p.category = v_category 
    AND p.slug != p_product_slug
    AND p.is_active = true
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_interests_updated_at
  BEFORE UPDATE ON user_product_interests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES for Performance
-- ============================================

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_product_analytics_product_id ON product_analytics(product_id);
CREATE INDEX idx_product_analytics_user_id ON product_analytics(user_id);
CREATE INDEX idx_product_analytics_event_type ON product_analytics(event_type);
CREATE INDEX idx_product_analytics_created_at ON product_analytics(created_at);
CREATE INDEX idx_user_interests_user_id ON user_product_interests(user_id);
CREATE INDEX idx_user_interests_product_id ON user_product_interests(product_id);
CREATE INDEX idx_user_interests_score ON user_product_interests(interest_score DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_product_interests ENABLE ROW LEVEL SECURITY;

-- Public can view active products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

-- Anyone can insert analytics (for tracking)
CREATE POLICY "Anyone can insert analytics" ON product_analytics
  FOR INSERT WITH CHECK (true);

-- Users can view their own analytics
CREATE POLICY "Users can view own analytics" ON product_analytics
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can view and update their own interests
CREATE POLICY "Users can manage own interests" ON user_product_interests
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE products IS 'Main products catalog with all product information';
COMMENT ON TABLE product_analytics IS 'Tracks all user interactions with products for analytics and optimization';
COMMENT ON TABLE user_product_interests IS 'Stores user interest scores for personalized recommendations';
COMMENT ON VIEW products_complete IS 'Complete product data with all related information in JSON format';
COMMENT ON VIEW product_analytics_summary IS 'Aggregated analytics per product for dashboard';
COMMENT ON FUNCTION track_product_view IS 'Track when a user views a product page';
COMMENT ON FUNCTION track_cta_click IS 'Track when a user clicks a CTA button';
COMMENT ON FUNCTION get_related_products IS 'Get related products based on category';

