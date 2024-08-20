'use client'

import { courses } from '@/db/schema'
import { Card } from './card'

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeId: number
}

export const List = ({ courses, activeId }: Props) => {
  return (
    // don't space tw classes in sqares
    <div className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeId}
        />
      ))}
    </div>
  )
}

export default List
