'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useCallback } from 'react'
import type { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  selected,
  label,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    const currentQuery = qs.parse(params.toString())

    const updatedQuery: typeof currentQuery & { category?: string } = {
      ...currentQuery,
      category: label,
    }

    if (params.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      className={`
      flex 
      flex-col 
      items-center 
      justify-center 
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected === true ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected === true ? 'text-neutral-800' : 'text-neutral-500'}
    `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
