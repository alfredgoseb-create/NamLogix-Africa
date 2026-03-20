import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bfqixovzyrcwffcazhtf.supabase.co'
const supabaseAnonKey = 'sb_publishable_B2thc4BA2OcWdI6Od7pFpw_S1ttt0rC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)