'use client'

import { courses, userProgress } from '@/db/schema'
import { Card } from './card'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { upsertUserProgress } from '@/actions/user-progress'
import { toast } from 'sonner'

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeId?: typeof userProgress.$inferSelect.activeId
}

export const List = ({ courses, activeId }: Props) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const onClick = (id: number) => {
    if (pending) return

    if (id === activeId) {
      return router.push('/learn')
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error('Something went wrong.'))
    })
  }

  return (
    // don't space tw classes in sqares
    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeId}
        />
      ))}
    </div>
  )
}

export default List
