/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import type { SafeReservation, SafeUser } from '@/types'

import Container from '../Container'
import Heading from '../Heading'
import HousingCard from '../housing/HousingCard'

interface TripsClientProps {
  currentUser: SafeUser
  reservations: SafeReservation[]
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(Number(id))

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled')
          router.refresh()
        })
        .catch(() => {
          toast.error('Something went wrong')
        })
        .finally(() => {
          setDeletingId(null)
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been where y'oure going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((el) => (
          <HousingCard
            key={el.id}
            data={el.housings as any}
            actionId={el.id.toString()}
            onAction={onCancel}
            disabled={deletingId === el.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
