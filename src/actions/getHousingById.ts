import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

import type { Database } from '@/types/database'

interface IParams {
  housingId?: number
}

const getHousingById = async (params: IParams) => {
  try {
    const supabase = createServerComponentSupabaseClient<Database>({
      headers,
      cookies,
    })

    const { housingId } = params

    const { data, error } = await supabase
      .from('housings')
      .select('*, users (*)')
      .eq('id', housingId)
      .single()

    if (error !== null) {
      return null
    }

    return data
  } catch (error: unknown) {
    return null
  }
}

export default getHousingById
