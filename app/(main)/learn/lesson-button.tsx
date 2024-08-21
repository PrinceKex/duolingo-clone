'use client'

import Link from 'next/link'
import { Check, Crown, Star } from 'lucide-react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  id: number
  index: number
  totalCount: number
  locked?: boolean
  current?: boolean
  percentage: number
}
const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
}: Props) => {
  const cycleLength = 8
  const cycleIndex = index % cycleLength
  let indentLevel

  if (cycleIndex <= 2) {
    indentLevel = cycleIndex
  } else if (cycleIndex <= 4) {
    indentLevel = 4 - cycleIndex
  } else if (cycleIndex <= 6) {
    indentLevel = cycleIndex - 4
  } else {
    indentLevel = cycleIndex - 8
  }

  const rightPosition = indentLevel * 40
  const isFirst = index === 0
  const isLast = index === totalCount
  const isComplete = !current && !locked
  const Icon = isComplete ? Check : isLast ? Crown : Star
  const href = isComplete ? `/lesson/${id}` : '/lesson'

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? 'none' : 'auto' }}
    >
      <div
        className='relative'
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isComplete ? 60 : 24,
        }}
      >
        {current ? (
          <div className='h-[102px] w-[102px] relative'>
            <div className='absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10'>
              Start
              <div className='absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2' />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: '#4ade80',
                },
                trail: {
                  stroke: '#e5e7eb',
                },
              }}
            >
              <Button
                size='rounded'
                variant={locked ? 'locked' : 'secondary'}
                className='h-[70px] w-[70px] border-b-8'
              >
                <Icon
                  className={cn(
                    'h-10 w-10',
                    locked
                      ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                      : 'fill-primary-foreground text-primary-foreground',
                    isComplete && 'fill-none stroke-[4]'
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size='rounded'
            variant={locked ? 'locked' : 'secondary'}
            className='h-[70px] w-[70px] border-b-8'
          >
            <Icon
              className={cn(
                'h-10 w-10',
                locked
                  ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                  : 'fill-primary-foreground text-primary-foreground',
                isComplete && 'fill-none stroke-[4]'
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  )
}

export default LessonButton
