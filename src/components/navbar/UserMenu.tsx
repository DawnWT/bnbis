'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import type { getCurrentUser } from '@/actions/getCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useSupabase } from '@/providers/SupabaseProvider'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

interface UserMenuProps {
  currentUser: Awaited<ReturnType<typeof getCurrentUser>> | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    router.refresh()
  }

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnbis your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser !== null ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="Airbnbis my home" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
