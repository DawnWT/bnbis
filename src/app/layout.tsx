import '@/styles/globals.css'

import { Nunito } from 'next/font/google'

import { getCurrentUser } from '@/actions/getCurrentUser'
import ClientOnly from '@/components/ClientOnly'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import Navbar from '@/components/navbar/Navbar'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import ToasterProvider from '@/providers/ToasterProvider'

export const metadata = {
  title: 'Airbnbis',
  description: 'Airbnbis clone',
}

const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
