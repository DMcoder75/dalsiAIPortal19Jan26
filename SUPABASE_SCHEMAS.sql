-- ============================================================================
-- SUPABASE SCHEMAS FOR DALSI AI PORTAL - NEW FEATURES
-- ============================================================================
-- Copy and paste each section into Supabase SQL Editor to create tables
-- ============================================================================

-- ============================================================================
-- 1. EMAIL_GENERATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.email_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type VARCHAR(50) NOT NULL,
  recipient_name VARCHAR(255),
  recipient_email VARCHAR(255),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  tone VARCHAR(50),
  key_points TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for email_generations
CREATE INDEX IF NOT EXISTS idx_email_gen_user_id ON public.email_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_email_gen_email_type ON public.email_generations(email_type);
CREATE INDEX IF NOT EXISTS idx_email_gen_created_at ON public.email_generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_gen_is_favorite ON public.email_generations(is_favorite);
CREATE INDEX IF NOT EXISTS idx_email_gen_deleted_at ON public.email_generations(deleted_at) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.email_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_generations
CREATE POLICY "Users can view own email_generations"
  ON public.email_generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert email_generations"
  ON public.email_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own email_generations"
  ON public.email_generations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own email_generations"
  ON public.email_generations FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 2. SUMMARIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  original_text_length INTEGER,
  summary_type VARCHAR(50) NOT NULL,
  summary_text TEXT NOT NULL,
  summary_text_length INTEGER,
  compression_ratio DECIMAL(5, 2),
  source_language VARCHAR(10) DEFAULT 'en',
  key_points TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for summaries
CREATE INDEX IF NOT EXISTS idx_summaries_user_id ON public.summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_summaries_summary_type ON public.summaries(summary_type);
CREATE INDEX IF NOT EXISTS idx_summaries_created_at ON public.summaries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_summaries_is_favorite ON public.summaries(is_favorite);
CREATE INDEX IF NOT EXISTS idx_summaries_deleted_at ON public.summaries(deleted_at) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for summaries
CREATE POLICY "Users can view own summaries"
  ON public.summaries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert summaries"
  ON public.summaries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own summaries"
  ON public.summaries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own summaries"
  ON public.summaries FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. TRANSLATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text TEXT NOT NULL,
  source_language VARCHAR(10) NOT NULL,
  source_language_name VARCHAR(100),
  target_language VARCHAR(10) NOT NULL,
  target_language_name VARCHAR(100),
  translated_text TEXT NOT NULL,
  translation_quality VARCHAR(50),
  is_professional_translation BOOLEAN DEFAULT false,
  cultural_notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for translations
CREATE INDEX IF NOT EXISTS idx_translations_user_id ON public.translations(user_id);
CREATE INDEX IF NOT EXISTS idx_translations_source_language ON public.translations(source_language);
CREATE INDEX IF NOT EXISTS idx_translations_target_language ON public.translations(target_language);
CREATE INDEX IF NOT EXISTS idx_translations_language_pair ON public.translations(source_language, target_language);
CREATE INDEX IF NOT EXISTS idx_translations_created_at ON public.translations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_translations_is_favorite ON public.translations(is_favorite);
CREATE INDEX IF NOT EXISTS idx_translations_deleted_at ON public.translations(deleted_at) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for translations
CREATE POLICY "Users can view own translations"
  ON public.translations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert translations"
  ON public.translations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own translations"
  ON public.translations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own translations"
  ON public.translations FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. TUTOR_SESSIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.tutor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  difficulty_level VARCHAR(50) NOT NULL,
  learning_style VARCHAR(50),
  explanation TEXT NOT NULL,
  key_concepts TEXT[],
  examples TEXT[],
  practice_questions JSONB DEFAULT '[]'::jsonb,
  resources TEXT[],
  estimated_learning_time_minutes INTEGER,
  session_status VARCHAR(50) DEFAULT 'active',
  progress_percentage INTEGER DEFAULT 0,
  user_notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_favorite BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for tutor_sessions
CREATE INDEX IF NOT EXISTS idx_tutor_user_id ON public.tutor_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_tutor_topic ON public.tutor_sessions(topic);
CREATE INDEX IF NOT EXISTS idx_tutor_difficulty_level ON public.tutor_sessions(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_tutor_session_status ON public.tutor_sessions(session_status);
CREATE INDEX IF NOT EXISTS idx_tutor_created_at ON public.tutor_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tutor_is_favorite ON public.tutor_sessions(is_favorite);
CREATE INDEX IF NOT EXISTS idx_tutor_deleted_at ON public.tutor_sessions(deleted_at) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.tutor_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tutor_sessions
CREATE POLICY "Users can view own tutor_sessions"
  ON public.tutor_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert tutor_sessions"
  ON public.tutor_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tutor_sessions"
  ON public.tutor_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tutor_sessions"
  ON public.tutor_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- OPTIONAL: CREATE VIEWS FOR ANALYTICS
-- ============================================================================

-- View: User's non-deleted records
CREATE OR REPLACE VIEW public.user_email_generations AS
  SELECT * FROM public.email_generations
  WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW public.user_summaries AS
  SELECT * FROM public.summaries
  WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW public.user_translations AS
  SELECT * FROM public.translations
  WHERE deleted_at IS NULL;

CREATE OR REPLACE VIEW public.user_tutor_sessions AS
  SELECT * FROM public.tutor_sessions
  WHERE deleted_at IS NULL;

-- ============================================================================
-- OPTIONAL: CREATE FUNCTIONS FOR COMMON OPERATIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_email_generations_timestamp
BEFORE UPDATE ON public.email_generations
FOR EACH ROW
EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_summaries_timestamp
BEFORE UPDATE ON public.summaries
FOR EACH ROW
EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_translations_timestamp
BEFORE UPDATE ON public.translations
FOR EACH ROW
EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_tutor_sessions_timestamp
BEFORE UPDATE ON public.tutor_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_timestamp();

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify all tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('email_generations', 'summaries', 'translations', 'tutor_sessions');

-- Verify indexes
SELECT indexname FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('email_generations', 'summaries', 'translations', 'tutor_sessions');

-- ============================================================================
-- END OF SCHEMA CREATION
-- ============================================================================
