import { createClient } from '@supabase/supabase-js'

// Project URL from your screenshot
const supabaseUrl = 'https://ca323d95-8904-43fe-b4e4-c34787ae5bef.supabase.co'

// Replace the text below with your actual 'anon' key from Supabase Settings > API
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)