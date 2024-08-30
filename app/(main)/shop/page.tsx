import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { UserProgress } from '@/components/user-progress'
import { getUserProgress, getUserSubscription } from '@/db/queries'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Items } from './items'
import { Promo } from '@/components/promo'
import { Quest } from '@/components/quest'

const ShopPage = async () => {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ])

  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }

  const isPro = !!userSubscription?.isActive

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          activeSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quest points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image src='/shop.svg' alt='Shop' width={90} height={90} />
          <h1 className='text-center bold text-neutral text-2xl my-6'>Shop</h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Spend your points on cool stuff
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            activeSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  )
}

export default ShopPage
