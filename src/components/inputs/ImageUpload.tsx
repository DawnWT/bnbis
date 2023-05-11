'use client'

import type { ChangeEvent } from 'react'
import React, { useCallback } from 'react'
import { toast } from 'react-hot-toast'

import { useSupabase } from '@/providers/SupabaseProvider'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const { supabase } = useSupabase()

  const handleUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        toast.error('No file selected')
        return
      }
      const file = e.target.files[0]

      const { data, error } = await supabase.storage
        .from('rent-images')
        .upload(`public/${file.name}`, file)

      if (error) {
        toast.error(error.message)
        return
      }

      onChange(data.path)
    },
    [onChange, supabase]
  )

  return (
    <input
      type="file"
      accept="image/*"
      className=" relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
      onChange={async (e) => handleUpload(e)}
      max={1}
    />
  )
}

export default ImageUpload
