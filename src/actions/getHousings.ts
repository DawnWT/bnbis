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
    const { data: reservationData, error: reservationError } = await supabase
      .from('reservations')
      .select('housing_id')
      .not('start_date', 'lte', startDate)
      .not('end_date', 'gte', endDate)

    if (reservationError !== null) {
      return []
    }

    query = query.in(
      'id',
      reservationData.map((el) => el.housing_id)
    )
  }

  const { data, error } = await query

  if (error !== null) {
    return []
  }

  return data
}

export default getHousings
