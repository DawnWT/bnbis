import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

const getFavoriteHousings = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError !== null) {
    return []
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', session?.user.id ?? '')
    .single()

  if (userError !== null) {
    return []
  }

  const { data, error } = await supabase
    .from('housings')
    .select()
    .in('id', userData.favorite_ids)

  if (error !== null) {
    return []
  }

  return data
}

export default getFavoriteHousings
