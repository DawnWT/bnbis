'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import type { IconType } from 'react-icons'

import useCountries from '@/hooks/useCountries'
import type { SafeUser } from '@/types'

import Avatar from '../Avatar'
import HousingCategory from './HousingCategory'

const Map = dynamic(async () => import('../Map'), { ssr: false })

interface HousingInfoProps {
  user: SafeUser
  description: string
  guestCount: number
  roomCount: number
  bathroomCount: number
  category:
    | {
        label: string
        icon: IconType
        description: string
      }
    | undefined
  locationValue: string
}

const HousingInfo: React.FC<HousingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user.name}</div>
          <Avatar
            src={`https://hqhzlkfbyiddcniabion.supabase.co/storage/v1/object/public/avatars/${user.avatar}`}
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <HousingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default HousingInfo
