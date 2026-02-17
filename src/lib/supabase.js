import { createClient } from '@supabase/supabase-js'

// Load Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhgypnlikwtfxnkixjzp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoZ3lwbmxpa3d0Znhua2l4anpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDM0NTAsImV4cCI6MjA3NTAxOTQ1MH0.AYgnsycrrRTwR56B7HJSgKGg6Hjf4G04ytFm2OGziO0'

// Verify Supabase configuration
if (!supabaseUrl || !supabaseAnonKey) {