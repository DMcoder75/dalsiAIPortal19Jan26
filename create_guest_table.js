const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function createGuestConversationsTable() {
  console.log('Creating guest_conversations table...')
  
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS guest_conversations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          session_id TEXT NOT NULL,
          messages JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours'
      );

      CREATE INDEX IF NOT EXISTS idx_guest_conversations_session ON guest_conversations(session_id);
      CREATE INDEX IF NOT EXISTS idx_guest_conversations_expires ON guest_conversations(expires_at);
    `
  })

  if (error) {
    console.error('Error:', error)
  } else {
    console.log('✅ Table created successfully!')
  }
}

createGuestConversationsTable()
