import { getCurrentUser } from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import ClientOnly from '@/components/client/ClientOnly'
import ReservationsClient from '@/components/client/ReservationsClient'
import EmptyState from '@/components/EmptyState'

export const revalidate = 0

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations found"
          subtitle="Looks like you have no reservations on your properties"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage
