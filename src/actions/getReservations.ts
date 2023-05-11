import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

const getReservations = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data, error } = await supabase.from('reservations').select()

  if (error !== null) {
    return []
  }

  return data
}

export default getReservations
