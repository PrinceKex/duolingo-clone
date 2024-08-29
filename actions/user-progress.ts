'use server'

// import { UserProgress } from '@/components/user-progress'
import db from '@/db/drizzle'
import { getCourseById, getUserProgress } from '@/db/queries'
import { challengeProgress, challenges, userProgress } from '@/db/schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// TODO: Move alongside item component constant into a common file
const POINTS_TO_REFILL = 10

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth()
  const user = await currentUser()
  if (!userId || !user) {
    throw new Error('User not authenticated')
  }

  const course = await getCourseById(courseId)
  if (!course) {
    throw new Error('Course not found')
  }
  // Enable once units are added
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error('Course has no units or lessons')
  // }
  const existingProgress = await getUserProgress()
  if (existingProgress) {
    await db.update(userProgress).set({
      activeId: courseId,
      userName: user.firstName || 'User',
      userImageSrc: user.imageUrl || '/mascot.svg',
    })
    revalidatePath('/courses')
    revalidatePath('/learn')
    redirect('/learn')
  }
  await db.insert(userProgress).values({
    userId,
    activeId: courseId,
    userName: user.firstName || 'User',
    userImageSrc: user.imageUrl || '/mascot.svg',
  })
  revalidatePath('/courses')
  revalidatePath('/learn')
  redirect('/learn')
}

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const currentUserProgress = await getUserProgress()
  // TODO: Handle subscription query later
  if (!currentUserProgress) {
    throw new Error('User progress not found')
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })
  if (!challenge) {
    throw new Error('Challenge not found')
  }
  const lessonId = challenge.lessonId

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  })
  const isPractice = !!existingChallengeProgress
  if (isPractice) {
    return { error: 'practice' }
  }

  // TODO: Handle Subscription

  if (currentUserProgress.hearts === 0) {
    return { error: 'hearts' }
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId))

  revalidatePath('/shop')
  revalidatePath('/learn')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
  // revalidatePath('/lesson')
  revalidatePath(`/lesson/${lessonId}`)
}

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress()
  if (!currentUserProgress) {
    throw new Error('User Progress not found')
  }
  if (currentUserProgress.hearts === 5) {
    throw new Error('Hearts already full')
  }
  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error('Not enough points')
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId))

  revalidatePath('/shop')
  revalidatePath('/learn')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
  revalidatePath('/shop')
}
