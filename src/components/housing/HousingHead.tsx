'use client'

import Image from 'next/image'
import React from 'react'

import useCountries from '@/hooks/useCountries'
import type { SafeUser } from '@/types'

import Heading from '../Heading'
import HeartButton from '../HeartButton'

interface HousingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: number
  currentUser?: SafeUser | null
}

const HousingHead: React.FC<HousingHeadProps> = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={`https://hqhzlkfbyiddcniabion.supabase.co/storage/v1/object/public/rent-images/${imageSrc}`}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton housingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default HousingHead
