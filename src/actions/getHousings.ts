import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

export interface IHousingParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

const getHousings = async ({
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
  userId,
}: IHousingParams) => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  let query = supabase.from('housings').select().order('created_at')

  if (userId) {
    query = query.eq('user_id', userId)
  }

  if (category) {
    query = query.eq('category', category)
  }

  if (roomCount) {
    query = query.gte('room_count', roomCount)
  }

  if (guestCount) {
    query = query.gte('guest_count', guestCount)
  }

  if (bathroomCount) {
    query = query.gte('bathroom_count', bathroomCount)
  }

  if (locationValue) {
    query = query.eq('location', locationValue)
  }

  if (startDate && endDate) {
    query = query.or(
      `start_date.lte.${startDate},and(end_date.eq.${startDate}),start_date.lte.${endDate},and(end_date.gte.${endDate})`
    )
  }

  const { data, error } = await query

  if (error !== null) {
    return []
  }

  return data
}

export default getHousings
