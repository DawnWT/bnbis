'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

import Container from '@/components/Container'

import CategoryBox from '../CategoryBox'

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
  },
  {
    label: 'Countryside',
    icon: TbMountain,
  },
  {
    label: 'Pools',
    icon: TbPool,
  },
  {
    label: 'Islands',
    icon: GiIsland,
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
  },
  {
    label: 'Castles',
    icon: GiCastle,
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
  },
  {
    label: 'Arctic',
    icon: BsSnow,
  },
  {
    label: 'Desert',
    icon: GiCactus,
  },
  {
    label: 'Barns',
    icon: GiBarn,
  },
  {
    label: 'Luxe',
    icon: IoDiamond,
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((el) => (
          <CategoryBox
            key={el.label}
            label={el.label}
            icon={el.icon}
            selected={category === el.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
