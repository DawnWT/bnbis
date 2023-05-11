import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/database'

interface IParams {
  reservationId?: string
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: IParams }
) => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    return NextResponse.error()
  }

  const { reservationId } = params

  if (!reservationId) {
    return NextResponse.error()
  }

  const { data: reservationData, error: reservationError } = await supabase
    .from('reservations')
    .select('*, housings(user_id)')
    .eq('id', reservationId)
    .or(`user_id.eq.${userData.user.id},user_id.eq.${userData.user.id}`, {
      foreignTable: 'housings',
    })
    .single()

  if (reservationError) {
    return NextResponse.error()
  }

  const { data: deleteData, error: deleteError } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationData.id)
    .select()
    .single()

  if (deleteError) {
    return NextResponse.error()
  }

  return NextResponse.json(deleteData)
}
