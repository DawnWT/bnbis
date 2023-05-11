'use client'

import React from 'react'
import type { IconType } from 'react-icons'

interface HousingCategoryProps {
  icon: IconType
  label: string
  description: string
}

const HousingCategory: React.FC<HousingCategoryProps> = ({
  description,
  icon: Icon,
  label,
}) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-row items-center gap-4">
      <Icon size={40} className="text-neutral-600" />
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-neutral-500 font-light">{description}</div>
      </div>
    </div>
  </div>
)

export default HousingCategory
