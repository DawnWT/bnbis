import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/database'

export const revalidate = 0

interface IParams {
  housingId?: string
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: authUserData, error: authUserError } =
    await supabase.auth.getUser()

  if (authUserError) {
    return NextResponse.error()
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', authUserData.user.id)
    .single()

  if (userError) {
    return NextResponse.error()
  }

  const { housingId } = params

  if (!housingId || typeof housingId !== 'string') {
    return NextResponse.error()
  }

  const favoriteIds = [...userData.favorite_ids]

  favoriteIds.push(Number(housingId))

  const { data: updateData, error: updateError } = await supabase
    .from('users')
    .update({ favorite_ids: favoriteIds })
    .eq('id', authUserData.user.id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.error()
  }

  return NextResponse.json(updateData)
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data: authUserData, error: authUserError } =
    await supabase.auth.getUser()

  if (authUserError) {
    return NextResponse.error()
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', authUserData.user.id)
    .single()

  if (userError) {
    return NextResponse.error()
  }

  const { housingId } = params

  if (!housingId || typeof housingId !== 'string') {
    return NextResponse.error()
  }

  let favoriteIds = [...userData.favorite_ids]

  favoriteIds = favoriteIds.filter((id) => id !== Number(housingId))

  const { data: updateData, error: updateError } = await supabase
    .from('users')
    .update({ favorite_ids: favoriteIds })
    .eq('id', authUserData.user.id)
    .select()
    .single()

  if (updateError) {
    return NextResponse.error()
  }

  return NextResponse.json(updateData)
}
