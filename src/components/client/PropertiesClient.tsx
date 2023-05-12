'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { toast } from 'react-hot-toast'

import type { SafeHousing, SafeUser } from '@/types'

import Container from '../Container'
import Heading from '../Heading'
import HousingCard from '../housing/HousingCard'

interface PropertiesClientProps {
  housings: SafeHousing[]
  currentUser: SafeUser
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  housings,
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = React.useState<number | null>(null)

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(Number(id))

      axios
        .delete(`/api/housings/${id}`)
        .then(() => {
          toast.success('Housing deleted')
          router.refresh()
        })
        .catch(() => {
          toast.error(
            'An error occurred while creating the reservation deleting housing'
          )
        })
        .finally(() => {
          setDeletingId(null)
        })
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {housings.map((el) => (
          <HousingCard
            key={el.id}
            data={el}
            actionId={el.id.toString()}
            onAction={onDelete}
            disabled={deletingId === el.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
