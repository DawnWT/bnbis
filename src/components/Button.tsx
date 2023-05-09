'use client'

import React from 'react'
import type { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon: Icon,
  outline,
  small,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline === true ? 'bg-white' : 'bg-rose-500'}
        ${outline === true ? 'border-black' : 'border-rose-500'}
        ${outline === true ? 'text-black' : 'text-white'}
        ${small === true ? 'py-1' : 'py-3'}
        ${small === true ? 'text-sm' : 'text-md'}
        ${small === true ? 'font-light' : 'font-semibold'}
        ${small === true ? 'border-[1px]' : 'border-[2px]'}
      `}
  >
    {Icon && <Icon size={24} className="absolute left-4 top-3" />}
    {label}
  </button>
)

export default Button
