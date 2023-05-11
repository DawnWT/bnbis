import { getCurrentUser } from '@/actions/getCurrentUser'
import getHousingById from '@/actions/getHousingById'
import getReservations from '@/actions/getReservations'
import ClientOnly from '@/components/ClientOnly'
import EmptyState from '@/components/EmptyState'
import HousingClient from '@/components/HousingClient'

interface IParams {
  housingId: string
}

const HousingPage = async ({ params }: { params: IParams }) => {
  const housing = await getHousingById({ housingId: Number(params.housingId) })
  const currentUser = await getCurrentUser()
  const reservations = await getReservations({
    housingId: Number(params.housingId),
  })

  if (!housing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <HousingClient
        housing={housing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default HousingPage
