import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ca323d95-8904-43fe-b4e4-c34787ae5bef.supabase.co'
// CRITICAL: Replace the text below with your actual key from Supabase Settings > API
const supabaseAnonKey = 'YOUR_ACTUAL_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)