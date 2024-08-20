'use client'

import { courses } from '@/db/schema'

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeId: number
}

export const List = ({ courses, activeId }: Props) => {
  return <div></div>
}

export default List
