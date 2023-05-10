import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

export const getCurrentUser = async () => {
  try {
    const supabase = createServerComponentSupabaseClient<Database>({
      // supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      // supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      headers,
      cookies,
    })

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError !== null) {
      return null
    }

    if (session?.user.email === undefined) {
      return null
    }

    const { data, error: queryError } = await supabase
      .from('users')
      .select('*, listings (id, title), reservations (id, total_price)')
      .eq('id', session.user.id)
      .single()

    if (queryError !== null) {
      return null
    }

    return data
  } catch (error: unknown) {
    return null
  }
}