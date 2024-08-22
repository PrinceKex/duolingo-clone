'use client'

import { challengeOptions, challenges } from '@/db/schema'
import { useState } from 'react'
import { Header } from './header'

type Props = {
  initialPerc: number
  initialHearts: number
  initialId: number
  initialChallenges: (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: (typeof challengeOptions.$inferSelect)[]
  })[]
  userSubscription: any //TODO: Replace with sub db type
}

export const Quiz = ({
  initialPerc,
  initialHearts,
  initialId,
  initialChallenges,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPerc)
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
    </>
  )
}
