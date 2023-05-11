import axios from 'axios'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import type { SafeUser } from '@/types'

import useLoginModal from './useLoginModal'

interface IUseFavorite {
  housingId: number
  currentUser: SafeUser | null | undefined
}

const useFavorite = ({ housingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorite_ids ?? []

    return list.includes(housingId)
  }, [currentUser, housingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        loginModal.onOpen()

        return
      }

      try {
        let request: () => Promise<any>

        if (hasFavorited) {
          request = async () => axios.delete(`/api/favorites/${housingId}`)
        } else {
          request = async () => axios.post(`/api/favorites/${housingId}`)
        }

        await request()
        router.refresh()
        toast.success('Success')
      } catch (err: unknown) {
        toast.error('Something went wrong')
      }
    },
    [currentUser, hasFavorited, housingId, loginModal, router]
  )

  return { hasFavorited, toggleFavorite }
}

export default useFavorite
