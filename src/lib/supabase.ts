import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for public (client-side) operations
export const supabase = createClient(supabaseUrl, supabaseKey)

// Client for server-side operations (with admin privileges)
export const supabaseAdmin = serviceKey 
  ? createClient(supabaseUrl, serviceKey)
  : supabase 