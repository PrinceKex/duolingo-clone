import { cache } from 'react'
import db from './drizzle'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from './schema'

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany()

  return data
})

export const getUserProgress = cache(async () => {
  const { userId } = await auth()
  if (!userId) return null
  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  })

  return data
})

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  })
  return data
})

export const getUnits = cache(async () => {
  const { userId } = await auth()
  const userProgress = await getUserProgress()
  if (!userId || !userProgress?.activeId) {
    return []
  }

  // TODO: Confirm if order is needed
  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })

  const normalizedData = data.map((unit) => {
    const lessonsWithStatusCompleted = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false }
      }
      const completedChallenges = lesson.challenges.every((challenge) => {
        return (
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          challenge.challengeProgress.every((progress) => progress.completed)
        )
      })
      return { ...lesson, completed: completedChallenges }
    })
    return { ...unit, lessons: lessonsWithStatusCompleted }
  })
  return normalizedData
})

export const getCourseProgress = cache(async () => {
  const { userId } = await auth()
  const userProgress = await getUserProgress()
  if (!userId || !userProgress?.activeId) {
    return null
  }

  const unitsInCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  })
  const firstUnfinishedLesson = unitsInCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      // TODO: check last if clause for concerns
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 //||
          // challenge.challengeProgress.some(
          //   (progress) => progress.completed === false
          // )
        )
      })
    })
  return {
    activeLesson: firstUnfinishedLesson,
    activeLessonId: firstUnfinishedLesson?.id,
    //units: unitsInCourse,
  }
})

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth()
  if (!userId) {
    return null
  }
  const courseProgress = await getCourseProgress()
  const lessonId = id || courseProgress?.activeLessonId
  if (!lessonId) {
    return null
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  })
  if (!data || !data.challenges) {
    return null
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    // TODO: check last if clause for concerns
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed)
    return { ...challenge, completed }
  })
  return { ...data, challenges: normalizedChallenges }
})

export const getLessonPerc = cache(async () => {
  const courseProgress = await getCourseProgress()
  if (!courseProgress?.activeLessonId) {
    return 0
  }

  const lesson = await getLesson(courseProgress.activeLessonId)
  if (!lesson) {
    return 0
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  )
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  )
  return percentage
})
