'use client'

import axios from 'axios'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

import useLoginModal from '@/hooks/useLoginModal'
import type { SafeHousingWithUser, SafeReservation, SafeUser } from '@/types'

import Container from '../Container'
import HousingHead from '../housing/HousingHead'
import HousingInfo from '../housing/HousingInfo'
import HousingReservation from '../housing/HousingReservation'
import { categories } from '../navbar/Categories'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface HousingClientProps {
  reservations?: SafeReservation[]
  housing: SafeHousingWithUser
  currentUser?: SafeUser | null
}

const HousingClient: React.FC<HousingClientProps> = ({
  housing,
  currentUser,
  reservations = [],
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  // console.log(reservations)

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(housing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen()
      return
    }

    setIsLoading(true)

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        housingId: housing.id,
      })
      .then(() => {
        toast.success('Reservation created successfully')
        setDateRange(initialDateRange)

        router.refresh()
      })
      .catch(() => {
        toast.error('An error occurred while creating the reservation')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [loginModal, currentUser, totalPrice, dateRange, router, housing.id])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && housing.price) {
        setTotalPrice(dayCount * housing.price)
      } else {
        setTotalPrice(housing.price)
      }
    }
  }, [dateRange, housing.price])

  const disabledDate = useMemo(() => {
    const dates: Date[] = []

    reservations.forEach((el) => {
      const range = eachDayOfInterval({
        start: new Date(el.start_date),
        end: new Date(el.end_date),
      })

      dates.push(...range)
    })

    return dates
  }, [reservations])

  const category = useMemo(
    () => categories.find((el) => el.label === housing.category),
    [housing.category]
  )
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <HousingHead
            title={housing.title}
            imageSrc={housing.image_src}
            locationValue={housing.location_value}
            id={housing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <HousingInfo
              user={housing.users}
              category={category}
              description={housing.description}
              roomCount={housing.room_count}
              guestCount={housing.guest_count}
              bathroomCount={housing.bathroom_count}
              locationValue={housing.location_value}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <HousingReservation
                price={housing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => {
                  setDateRange(value)
                }}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDate}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default HousingClient
