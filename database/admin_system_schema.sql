-- ============================================
-- DalSi AI Admin System & RBAC
-- Role-Based Access Control with Analytics
-- ============================================

-- User Roles Enum
CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');

-- User Roles Table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role user_role DEFAULT 'user',
  permissions JSONB DEFAULT '[]'::jsonb,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin Activity Log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50), -- 'user', 'product', 'analytics', 'system'
  target_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Sessions (for detailed tracking)
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  country VARCHAR(100),
  city VARCHAR(100),
  region VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  user_agent TEXT,
  device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
  browser VARCHAR(100),
  os VARCHAR(100),
  referrer TEXT,
  landing_page TEXT,
  started_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  duration_seconds INTEGER,
  page_views INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- Page Views (detailed tracking)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES user_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  page_path VARCHAR(500) NOT NULL,
  page_title VARCHAR(500),
  referrer TEXT,
  time_on_page_seconds INTEGER,
  scroll_depth_percentage INTEGER,
  interactions_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Behavior Events (clicks, hovers, etc.)
CREATE TABLE IF NOT EXISTS user_behavior_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES user_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL, -- 'click', 'hover', 'scroll', 'form_submit', etc.
  element_id VARCHAR(200),
  element_class VARCHAR(200),
  element_text TEXT,
  page_path VARCHAR(500),
  x_position INTEGER,
  y_position INTEGER,
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Login Attempts Tracking
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  success BOOLEAN NOT NULL,
  failure_reason VARCHAR(200),
  ip_address INET,
  country VARCHAR(100),
  city VARCHAR(100),
  user_agent TEXT,
  device_type VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  is_suspicious BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- API Usage Tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint VARCHAR(200) NOT NULL,
  method VARCHAR(10) NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  request_size_bytes INTEGER,
  response_size_bytes INTEGER,
  ip_address INET,
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feature Usage Tracking
CREATE TABLE IF NOT EXISTS feature_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  feature_name VARCHAR(100) NOT NULL,
  product_slug VARCHAR(100),
  usage_count INTEGER DEFAULT 1,
  last_used_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, feature_name, product_slug)
);

-- Error Logs
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
  error_type VARCHAR(100) NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  page_path VARCHAR(500),
  user_agent TEXT,
  severity VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- VIEWS FOR ANALYTICS DASHBOARD
-- ============================================

-- Real-time Active Users
CREATE OR REPLACE VIEW active_users_now AS
SELECT 
  COUNT(DISTINCT user_id) as total_users,
  COUNT(DISTINCT CASE WHEN user_id IS NULL THEN session_id END) as guest_users,
  COUNT(DISTINCT CASE WHEN user_id IS NOT NULL THEN user_id END) as logged_in_users
FROM user_sessions
WHERE is_active = true 
  AND last_activity_at >= NOW() - INTERVAL '5 minutes';

-- User Activity Summary
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
  DATE(us.started_at) as date,
  COUNT(DISTINCT us.session_id) as total_sessions,
  COUNT(DISTINCT us.user_id) as unique_users,
  AVG(us.duration_seconds) as avg_session_duration,
  SUM(us.page_views) as total_page_views,
  AVG(us.page_views) as avg_pages_per_session
FROM user_sessions us
WHERE us.started_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(us.started_at)
ORDER BY date DESC;

-- Top Pages
CREATE OR REPLACE VIEW top_pages AS
SELECT 
  pv.page_path,
  pv.page_title,
  COUNT(*) as views,
  COUNT(DISTINCT pv.session_id) as unique_visitors,
  AVG(pv.time_on_page_seconds) as avg_time_on_page,
  AVG(pv.scroll_depth_percentage) as avg_scroll_depth
FROM page_views pv
WHERE pv.created_at >= NOW() - INTERVAL '7 days'
GROUP BY pv.page_path, pv.page_title
ORDER BY views DESC
LIMIT 20;

-- Geographic Distribution
CREATE OR REPLACE VIEW user_geography AS
SELECT 
  country,
  city,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(DISTINCT user_id) as unique_users
FROM user_sessions
WHERE started_at >= NOW() - INTERVAL '30 days'
  AND country IS NOT NULL
GROUP BY country, city
ORDER BY sessions DESC;

-- Login Success Rate
CREATE OR REPLACE VIEW login_analytics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_attempts,
  COUNT(CASE WHEN success THEN 1 END) as successful_logins,
  COUNT(CASE WHEN NOT success THEN 1 END) as failed_logins,
  ROUND(
    COUNT(CASE WHEN success THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as success_rate,
  COUNT(CASE WHEN is_suspicious THEN 1 END) as suspicious_attempts
FROM login_attempts
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Feature Usage Stats
CREATE OR REPLACE VIEW feature_usage_stats AS
SELECT 
  fu.feature_name,
  fu.product_slug,
  COUNT(DISTINCT fu.user_id) as unique_users,
  SUM(fu.usage_count) as total_usage,
  MAX(fu.last_used_at) as last_used
FROM feature_usage fu
WHERE fu.last_used_at >= NOW() - INTERVAL '30 days'
GROUP BY fu.feature_name, fu.product_slug
ORDER BY total_usage DESC;

-- Error Summary
CREATE OR REPLACE VIEW error_summary AS
SELECT 
  error_type,
  severity,
  COUNT(*) as occurrence_count,
  COUNT(DISTINCT user_id) as affected_users,
  COUNT(CASE WHEN is_resolved THEN 1 END) as resolved_count,
  MAX(created_at) as last_occurred
FROM error_logs
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY error_type, severity
ORDER BY occurrence_count DESC;

-- API Performance
CREATE OR REPLACE VIEW api_performance AS
SELECT 
  endpoint,
  method,
  COUNT(*) as request_count,
  AVG(response_time_ms) as avg_response_time,
  MAX(response_time_ms) as max_response_time,
  COUNT(CASE WHEN status_code >= 400 THEN 1 END) as error_count,
  ROUND(
    COUNT(CASE WHEN status_code < 400 THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(*), 0) * 100, 
    2
  ) as success_rate
FROM api_usage
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY endpoint, method
ORDER BY request_count DESC;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION is_admin(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = p_user_id 
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = p_user_id 
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Track user session
CREATE OR REPLACE FUNCTION track_user_session(
  p_session_id VARCHAR,
  p_user_id UUID DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_landing_page TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_session_uuid UUID;
BEGIN
  INSERT INTO user_sessions (
    session_id, user_id, ip_address, user_agent, referrer, landing_page
  ) VALUES (
    p_session_id, p_user_id, p_ip_address, p_user_agent, p_referrer, p_landing_page
  )
  RETURNING id INTO v_session_uuid;
  
  RETURN v_session_uuid;
END;
$$ LANGUAGE plpgsql;

-- Track page view
CREATE OR REPLACE FUNCTION track_page_view(
  p_session_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_page_path VARCHAR,
  p_page_title VARCHAR DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO page_views (
    session_id, user_id, page_path, page_title, referrer
  ) VALUES (
    p_session_id, p_user_id, p_page_path, p_page_title, p_referrer
  );
  
  -- Update session page views count
  UPDATE user_sessions 
  SET page_views = page_views + 1,
      last_activity_at = NOW()
  WHERE id = p_session_id;
END;
$$ LANGUAGE plpgsql;

-- Track login attempt
CREATE OR REPLACE FUNCTION track_login_attempt(
  p_email VARCHAR,
  p_user_id UUID DEFAULT NULL,
  p_success BOOLEAN DEFAULT false,
  p_failure_reason VARCHAR DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_is_suspicious BOOLEAN := false;
  v_recent_failures INTEGER;
BEGIN
  -- Check for suspicious activity (5+ failures in last 10 minutes)
  SELECT COUNT(*) INTO v_recent_failures
  FROM login_attempts
  WHERE email = p_email
    AND success = false
    AND created_at >= NOW() - INTERVAL '10 minutes';
  
  IF v_recent_failures >= 5 THEN
    v_is_suspicious := true;
  END IF;
  
  INSERT INTO login_attempts (
    email, user_id, success, failure_reason, 
    ip_address, user_agent, is_suspicious
  ) VALUES (
    p_email, p_user_id, p_success, p_failure_reason,
    p_ip_address, p_user_agent, v_is_suspicious
  );
END;
$$ LANGUAGE plpgsql;

-- Log admin action
CREATE OR REPLACE FUNCTION log_admin_action(
  p_admin_id UUID,
  p_action VARCHAR,
  p_target_type VARCHAR DEFAULT NULL,
  p_target_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  -- Verify user is admin
  IF NOT is_admin(p_admin_id) THEN
    RAISE EXCEPTION 'User is not an admin';
  END IF;
  
  INSERT INTO admin_activity_log (
    admin_id, action, target_type, target_id, 
    details, ip_address, user_agent
  ) VALUES (
    p_admin_id, p_action, p_target_type, p_target_id,
    p_details, p_ip_address, p_user_agent
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-assign default role to new users
CREATE OR REPLACE FUNCTION assign_default_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION assign_default_role();

-- Update session duration on end
CREATE OR REPLACE FUNCTION update_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ended_at IS NOT NULL AND OLD.ended_at IS NULL THEN
    NEW.duration_seconds := EXTRACT(EPOCH FROM (NEW.ended_at - NEW.started_at))::INTEGER;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_session_duration
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_session_duration();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Only admins can view roles
CREATE POLICY "Admins can view all roles" ON user_roles
  FOR SELECT USING (is_admin(auth.uid()));

-- Only super admins can modify roles
CREATE POLICY "Super admins can manage roles" ON user_roles
  FOR ALL USING (is_super_admin(auth.uid()));

-- Only admins can view admin activity log
CREATE POLICY "Admins can view activity log" ON admin_activity_log
  FOR SELECT USING (is_admin(auth.uid()));

-- Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
  FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- Only admins can view login attempts
CREATE POLICY "Admins can view login attempts" ON login_attempts
  FOR SELECT USING (is_admin(auth.uid()));

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);
CREATE INDEX idx_admin_activity_admin_id ON admin_activity_log(admin_id);
CREATE INDEX idx_admin_activity_created_at ON admin_activity_log(created_at);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX idx_user_sessions_is_active ON user_sessions(is_active);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);
CREATE INDEX idx_login_attempts_email ON login_attempts(email);
CREATE INDEX idx_login_attempts_created_at ON login_attempts(created_at);
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_feature_usage_user_id ON feature_usage(user_id);
CREATE INDEX idx_error_logs_severity ON error_logs(severity);
CREATE INDEX idx_error_logs_is_resolved ON error_logs(is_resolved);

-- ============================================
-- INITIAL ADMIN USER SETUP
-- ============================================

-- Note: This will be executed after the admin user is created in Firebase Auth
-- The user_id will need to be updated with the actual Firebase Auth UID

COMMENT ON TABLE user_roles IS 'User roles and permissions for RBAC';
COMMENT ON TABLE admin_activity_log IS 'Audit log of all admin actions';
COMMENT ON TABLE user_sessions IS 'Detailed user session tracking with geolocation';
COMMENT ON TABLE login_attempts IS 'Track all login attempts including failures';
COMMENT ON FUNCTION is_admin IS 'Check if user has admin or super_admin role';
COMMENT ON FUNCTION is_super_admin IS 'Check if user has super_admin role';

