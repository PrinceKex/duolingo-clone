import { getCourses } from '@/db/queries'
import React from 'react'
import List from './list'

const CoursesPage = async () => {
  const courses = await getCourses()
  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
      <h1 className='text-2xl font-bold text-neutral-700'>Courses Title</h1>
      {/* {JSON.stringify(data)} */}
      <List courses={courses} activeId={1} />
    </div>
  )
}

export default CoursesPage
