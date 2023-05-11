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

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = await req.json()

  const { data: insertData, error: insertError } = await supabase
    .from('housings')
    .insert({
      bathroom_count: bathroomCount,
      category,
      description,
      title,
      price,
      guest_count: guestCount,
      room_count: roomCount,
      image_src: imageSrc,
      location_value: location.value,
      user_id: userData.user.id,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.error()
  }

  return NextResponse.json(insertData)
}
