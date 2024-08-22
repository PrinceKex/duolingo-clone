import { getLesson, getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import { Quiz } from './quiz'

const LessonPage = async () => {
  const lessonData = getLesson()
  const userProgressData = getUserProgress()
  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
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
      userSubscription={null}
    />
  )
}

export default LessonPage
