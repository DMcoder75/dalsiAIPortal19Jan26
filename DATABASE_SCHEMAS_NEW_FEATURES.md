# Database Schemas for New Features

## Overview
Four new tables to support Email Writer, Summary, Translator, and Tutor features.

---

## 1. EMAIL_GENERATIONS Table

**Purpose:** Store all generated emails for user reference and history

```sql
CREATE TABLE public.email_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type varchar(50) NOT NULL,
    -- Options: 'professional', 'formal', 'casual', 'follow_up', 'complaint', 'inquiry', 'thank_you'
  recipient_name varchar(255),
  recipient_email varchar(255),
  subject text NOT NULL,
  body text NOT NULL,
  tone varchar(50),
    -- Options: 'formal', 'friendly', 'urgent', 'neutral'
  key_points text[],
    -- Array of key points included in email
  metadata jsonb,
    -- Additional data: {model_used, tokens_used, generation_time_ms, temperature, etc.}
  is_favorite boolean DEFAULT false,
  is_template boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp,
    -- Soft delete
  
  -- Indexes
  CONSTRAINT email_generations_user_id_idx UNIQUE (id, user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_email_type (email_type),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_is_favorite (is_favorite)
);

-- Trigger for updated_at
CREATE TRIGGER update_email_generations_timestamp
BEFORE UPDATE ON email_generations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## 2. SUMMARIES Table

**Purpose:** Store text summaries for user reference and comparison

```sql
CREATE TABLE public.summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text text NOT NULL,
  original_text_length integer,
    -- Character count of original text
  summary_type varchar(50) NOT NULL,
    -- Options: 'short', 'medium', 'detailed', 'bullet_points', 'key_takeaways'
  summary_text text NOT NULL,
  summary_text_length integer,
    -- Character count of summary
  compression_ratio decimal(5, 2),
    -- (original_length - summary_length) / original_length * 100
  source_language varchar(10) DEFAULT 'en',
    -- Language code (en, es, fr, etc.)
  key_points text[],
    -- Array of key takeaways
  metadata jsonb,
    -- Additional data: {model_used, tokens_used, generation_time_ms, etc.}
  is_favorite boolean DEFAULT false,
  is_template boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp,
    -- Soft delete
  
  -- Indexes
  CONSTRAINT summaries_user_id_idx UNIQUE (id, user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_summary_type (summary_type),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_is_favorite (is_favorite)
);

-- Trigger for updated_at
CREATE TRIGGER update_summaries_timestamp
BEFORE UPDATE ON summaries
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## 3. TRANSLATIONS Table

**Purpose:** Store translations for user reference and multi-language support

```sql
CREATE TABLE public.translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  original_text text NOT NULL,
  source_language varchar(10) NOT NULL,
    -- Language code (en, es, fr, de, zh, ja, ar, etc.)
  source_language_name varchar(100),
    -- Full language name (English, Spanish, French, etc.)
  target_language varchar(10) NOT NULL,
    -- Language code
  target_language_name varchar(100),
    -- Full language name
  translated_text text NOT NULL,
  translation_quality varchar(50),
    -- Options: 'high', 'medium', 'low' (based on confidence)
  is_professional_translation boolean DEFAULT false,
    -- Flag for professional/formal translation
  cultural_notes text,
    -- Any cultural context or notes about translation
  metadata jsonb,
    -- Additional data: {model_used, tokens_used, generation_time_ms, confidence_score, etc.}
  is_favorite boolean DEFAULT false,
  is_template boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  deleted_at timestamp,
    -- Soft delete
  
  -- Indexes
  CONSTRAINT translations_user_id_idx UNIQUE (id, user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_source_language (source_language),
  INDEX idx_target_language (target_language),
  INDEX idx_language_pair (source_language, target_language),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_is_favorite (is_favorite)
);

-- Trigger for updated_at
CREATE TRIGGER update_translations_timestamp
BEFORE UPDATE ON translations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## 4. TUTOR_SESSIONS Table

**Purpose:** Store learning sessions and educational content

```sql
CREATE TABLE public.tutor_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic varchar(255) NOT NULL,
    -- Topic being learned (e.g., "Machine Learning", "Python Basics")
  difficulty_level varchar(50) NOT NULL,
    -- Options: 'beginner', 'intermediate', 'advanced'
  learning_style varchar(50),
    -- Options: 'visual', 'textual', 'interactive', 'mixed'
  explanation text NOT NULL,
    -- Main explanation of the topic
  key_concepts text[],
    -- Array of key concepts covered
  examples text[],
    -- Array of examples provided
  practice_questions jsonb,
    -- Array of objects: [{question, difficulty, answer, explanation}, ...]
  resources text[],
    -- Array of resource links or references
  estimated_learning_time_minutes integer,
    -- Estimated time to complete
  session_status varchar(50) DEFAULT 'active',
    -- Options: 'active', 'completed', 'paused', 'archived'
  progress_percentage integer DEFAULT 0,
    -- 0-100 percentage of session completion
  user_notes text,
    -- User's personal notes during learning
  metadata jsonb,
    -- Additional data: {model_used, tokens_used, generation_time_ms, engagement_score, etc.}
  is_favorite boolean DEFAULT false,
  is_template boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  completed_at timestamp,
  deleted_at timestamp,
    -- Soft delete
  
  -- Indexes
  CONSTRAINT tutor_sessions_user_id_idx UNIQUE (id, user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_topic (topic),
  INDEX idx_difficulty_level (difficulty_level),
  INDEX idx_session_status (session_status),
  INDEX idx_created_at (created_at DESC),
  INDEX idx_is_favorite (is_favorite)
);

-- Trigger for updated_at
CREATE TRIGGER update_tutor_sessions_timestamp
BEFORE UPDATE ON tutor_sessions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
```

---

## Summary Table

| Table | Purpose | Key Fields | Indexes |
|-------|---------|-----------|---------|
| **email_generations** | Store generated emails | email_type, recipient, subject, body, tone | user_id, email_type, created_at, is_favorite |
| **summaries** | Store text summaries | original_text, summary_type, summary_text, compression_ratio | user_id, summary_type, created_at, is_favorite |
| **translations** | Store translations | source_language, target_language, translated_text, translation_quality | user_id, language_pair, created_at, is_favorite |
| **tutor_sessions** | Store learning sessions | topic, difficulty_level, explanation, practice_questions | user_id, topic, difficulty_level, session_status, created_at |

---

## Common Features Across All Tables

✅ **User Association** - All linked to `auth.users(id)`  
✅ **Soft Delete** - `deleted_at` field for data retention  
✅ **Favorites** - `is_favorite` for bookmarking  
✅ **Templates** - `is_template` for reusable templates  
✅ **Metadata** - `metadata jsonb` for extensibility  
✅ **Timestamps** - `created_at`, `updated_at` for tracking  
✅ **Indexes** - Optimized for common queries  
✅ **Triggers** - Auto-update `updated_at` on modifications  

---

## Migration Strategy

1. Create tables in Supabase
2. Add Row Level Security (RLS) policies for user isolation
3. Create indexes for performance
4. Set up triggers for timestamps
5. Create views for analytics if needed

---

## RLS Policies (For All Tables)

```sql
-- Enable RLS
ALTER TABLE email_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own records
CREATE POLICY "Users can view own records"
  ON email_generations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own records
CREATE POLICY "Users can insert own records"
  ON email_generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own records
CREATE POLICY "Users can update own records"
  ON email_generations FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own records
CREATE POLICY "Users can delete own records"
  ON email_generations FOR DELETE
  USING (auth.uid() = user_id);

-- (Repeat for other tables)
```

---

## Ready for Implementation?

These schemas are:
- ✅ Normalized and efficient
- ✅ Scalable for future features
- ✅ Secure with RLS policies
- ✅ Optimized with proper indexes
- ✅ Flexible with metadata fields

**Next Steps:**
1. Create tables in Supabase
2. Set up RLS policies
3. Build frontend components
4. Integrate with API

Proceed with creating these tables?
