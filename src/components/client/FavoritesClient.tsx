'use client'

import React from 'react'

import type { SafeHousing, SafeUser } from '@/types'

import Container from '../Container'
import Heading from '../Heading'
import HousingCard from '../housing/HousingCard'

interface FavoritesClientProps {
  housings: SafeHousing[]
  currentUser: SafeUser
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  housings,
}) => (
  <Container>
    <Heading title="Favorites" subtitle="List of places you favorited" />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {housings.map((el) => (
        <HousingCard currentUser={currentUser} key={el.id} data={el} />
      ))}
    </div>
  </Container>
)

export default FavoritesClient
