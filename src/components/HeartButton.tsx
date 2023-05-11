'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import useFavorite from '@/hooks/useFavorite'
import type { SafeUser } from '@/types'

interface HeartButtonProps {
  housingId: number
  currentUser?: SafeUser
}

const HeartButton: React.FC<HeartButtonProps> = ({
  housingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    housingId,
    currentUser,
  })

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default HeartButton
