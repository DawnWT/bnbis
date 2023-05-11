'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useSupabase } from '@/providers/SupabaseProvider'

import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'

const LoginModal = () => {
  const { supabase } = useSupabase()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true)

    supabase.auth
      .signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      .then(async ({ data, error }) => {
        if (error !== null) {
          toast.error(`Something went wrong: ${error.message}`)
          return
        }

        if (data.session !== null) {
          await supabase.auth.setSession(data.session)
          toast.success('Logged in successfully')

          loginModal.onClose()
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
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in to your account !" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-500 text-center mt-4 font-light">
      <div className="flex flex-row items-center justify-center gap-2">
        <span>First Time using Airbnbis</span>
        <span
          onClick={toggle}
          className="text-neutral-800 cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
