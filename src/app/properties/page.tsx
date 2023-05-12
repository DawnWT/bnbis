import { getCurrentUser } from '@/actions/getCurrentUser'
import getHousings from '@/actions/getHousings'
import ClientOnly from '@/components/client/ClientOnly'
import PropertiesClient from '@/components/client/PropertiesClient'
import EmptyState from '@/components/EmptyState'

export const revalidate = 0

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const housings = await getHousings({ userId: currentUser.id })

  if (housings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient housings={housings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
