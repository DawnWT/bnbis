/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useSupabase } from '@/providers/SupabaseProvider'

import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()
  const { supabase } = useSupabase()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true)

    supabase.auth
      .signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { name: formData.name } },
      })
      .then(async ({ error, data }) => {
        if (error !== null) {
          toast.error(`Something went wrong: ${error.message}`)
          return
        }

        if (data.session !== null) {
          await supabase.auth.setSession(data.session)
          toast.success('Registered successfully')

          registerModal.onClose()
          router.refresh()
          return
        }

        toast.error('Something went wrong')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnbis" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register as any}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register as any}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register as any}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-500 text-center mt-4 font-light">
      <div className="flex flex-row items-center justify-center gap-2">
        <span>Already have an account ?</span>
        <span
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Log in
        </span>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
