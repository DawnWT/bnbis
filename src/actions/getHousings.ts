import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

const getHousings = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data, error } = await supabase
    .from('housings')
    .select()
    .order('created_at')

  if (error !== null) {
    return []
  }

  return data
}

export default getHousings
