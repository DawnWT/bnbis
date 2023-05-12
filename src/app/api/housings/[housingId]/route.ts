import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/database'

interface IParams {
  housingId?: string
}

export const revalidate = 0

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) {
    return NextResponse.error()
  }

  const { housingId } = params

  if (!housingId) {
    return NextResponse.error()
  }

  const { data: deleteData, error: deleteError } = await supabase
    .from('housings')
    .delete()
    .eq('id', Number(housingId))
    .eq('user_id', userData.user.id)
    .select()
    .single()

  if (deleteError) {
    return NextResponse.error()
  }

  return NextResponse.json(deleteData)
}
