'use client'

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

import type { Database } from '@/types/database'

interface SupabaseContext {
  supabase: SupabaseClient<Database>
}

interface SupabaseProviderProps {
  children: React.ReactNode
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children,
}) => {
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>())
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }

  return context
}
