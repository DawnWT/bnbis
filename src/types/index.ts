import type { getCurrentUser } from '@/actions/getCurrentUser'
import type getHousings from '@/actions/getHousings'
import type getReservations from '@/actions/getReservations'

export type SafeUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
export type SafeHousing = Awaited<ReturnType<typeof getHousings>>[number]
export type SafeReservation = Awaited<
  ReturnType<typeof getReservations>
>[number]
