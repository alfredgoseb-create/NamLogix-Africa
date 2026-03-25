// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

// Environment variables (recommended for production)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bfqixovzyrcwffcazhtf.supabase.co'

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_B2thc4BA2OcWdI6Od7pFpw_S1ttt0rC'

// Prevent app crash if keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase environment variables are missing. Check your Vercel settings.'
  )
}

// Create client safely
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null