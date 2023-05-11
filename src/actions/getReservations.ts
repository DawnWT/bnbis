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

  const query: Record<string, any> = {}

  if (housingId) {
    query['housing_id'] = housingId
  }

  if (userId) {
    query['user_id'] = userId
  }

  if (authorId) {
    query['housings'] = { user_id: authorId }
  }

  const { data, error } = await supabase
    .from('reservations')
    .select('*, housings:housing_id(*)')
    .match(query)
    .order('created_at')

  if (error !== null) {
    return []
  }

  return data
}

export default getReservations
