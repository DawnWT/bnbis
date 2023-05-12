import { getCurrentUser } from '@/actions/getCurrentUser'
import type { IHousingParams } from '@/actions/getHousings'
import getHousings from '@/actions/getHousings'
import ClientOnly from '@/components/client/ClientOnly'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import HousingCard from '@/components/housing/HousingCard'

interface HomeProps {
  searchParams: IHousingParams
}

export const revalidate = 0

export default async function Home({ searchParams }: HomeProps) {
  const housings = await getHousings(searchParams)
  const currentUser = await getCurrentUser()

  if (housings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8"
        >
          {housings.map((el) => (
            <HousingCard key={el.id} data={el} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
