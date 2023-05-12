/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import type { SafeReservation, SafeUser } from '@/types'

import Container from '../Container'
import Heading from '../Heading'
import HousingCard from '../housing/HousingCard'

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser: SafeUser
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((el) => (
          <HousingCard
            key={el.id}
            data={el.housings as any}
            reservation={el}
            actionId={el.id.toString()}
            onAction={onCancel}
            disabled={deletingId === el.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
