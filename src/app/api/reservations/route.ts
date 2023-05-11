import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/database'

export const POST = async (req: NextRequest) => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    return NextResponse.error()
  }

  const { housingId, startDate, endDate, totalPrice } = await req.json()

  if (!housingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error()
  }

  const { data: reservationData, error: reservationError } = await supabase
    .from('reservations')
    .insert({
      housing_id: housingId,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
      user_id: userData.user.id,
    })
    .select()
    .single()

  if (reservationError) {
    return NextResponse.error()
  }

  return NextResponse.json(reservationData)
}
