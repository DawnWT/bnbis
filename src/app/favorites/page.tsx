import { getCurrentUser } from '@/actions/getCurrentUser'
import getFavoriteHousings from '@/actions/getFavoriteHousings'
import ClientOnly from '@/components/client/ClientOnly'
import FavoritesClient from '@/components/client/FavoritesClient'
import EmptyState from '@/components/EmptyState'

export const revalidate = 0

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favorites = await getFavoriteHousings()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites found"
          subtitle="Looks like you have no favorites on your properties"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient housings={favorites} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage
