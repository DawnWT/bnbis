'use client'

import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

import useCountries from '@/hooks/useCountries'
import type { SafeHousing, SafeReservation, SafeUser } from '@/types'

import Button from '../Button'
import HeartButton from '../HeartButton'

interface HousingCardProps {
  data: SafeHousing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const HousingCard: React.FC<HousingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.location_value)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.total_price
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.start_date)
    const end = new Date(reservation.end_date)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => {
        router.push(`/housings/${data.id}`)
      }}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={`https://hqhzlkfbyiddcniabion.supabase.co/storage/v1/object/public/rent-images/${data.image_src}`}
            alt="Housing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton housingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate ?? data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default HousingCard
