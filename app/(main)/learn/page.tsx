import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'
import {
  getCourseProgress,
  getLessonPerc,
  getUnits,
  getUserProgress,
} from '@/db/queries'
import { redirect } from 'next/navigation'
import { Unit } from './unit'

const LearnPage = async () => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercData = getLessonPerc()
  const unitsData = getUnits()

  const [userProgress, units, courseProgress, lessonPerc] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercData,
  ])
  if (!userProgress || !userProgress.activeCourse) {
    redirect('/courses')
  }
  if (!courseProgress) {
    redirect('/courses')
  }

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          activeSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPerc={lessonPerc}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
