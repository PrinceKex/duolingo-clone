import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Quiz } from '../quiz'

type Props = {
  params: {
    lessonId: number
  }
}

const LessonIdPage = async ({ params }: Props) => {
  const lessonData = getLesson(params.lessonId)
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()
  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ])
  if (!lesson || !userProgress) {
    redirect('/learn')
  }

  const initalPerc =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100

  return (
    <Quiz
      initialId={lesson.id}
      initialChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPerc={initalPerc}
      userSubscription={userSubscription}
    />
  )
}

export default LessonIdPage
