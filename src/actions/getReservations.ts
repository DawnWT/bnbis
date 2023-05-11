import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

interface IParams {
  housingId?: number
  userId?: string
  authorId?: string
}

const getReservations = async ({ authorId, housingId, userId }: IParams) => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  let query = supabase
    .from('reservations')
    .select('*, housings(*)')
    .order('created_at')

  if (housingId) {
    query = query.eq('housing_id', housingId)
  }

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (authorId) {
    query = query.eq('housings.user_id', authorId)
  }

  const { data, error } = await query

  if (error !== null) {
    return []
  }

  return data
}

export default getReservations
