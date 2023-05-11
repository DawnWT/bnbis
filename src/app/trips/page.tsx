import { getCurrentUser } from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import ClientOnly from '@/components/client/ClientOnly'
import TripsClient from '@/components/client/TripsClient'
import EmptyState from '@/components/EmptyState'

const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  )
}

export default TripsPage
