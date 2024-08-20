'use server'

import db from '@/db/drizzle'
import { getCourseById, getUserProgress } from '@/db/queries'
import { userProgress } from '@/db/schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
