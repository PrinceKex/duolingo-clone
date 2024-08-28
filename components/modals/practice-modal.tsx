'use client'

import { usePracticeModal } from '@/store/use-practice-modal'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import Image from 'next/image'
import { Button } from '../ui/button'

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = usePracticeModal()

  useEffect(() => setIsClient(true), [])
  if (!isClient) return null

  // const onClick = () => {
  //   close()
  //   router.push('/store')
  // }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image src='/heart.svg' alt='Heart' height={100} width={100} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            Practice Lesson
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Use practice lessons to regain hearts and points. You cannot loose
            hearts or points in practice lessons.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            {/* <Button
              variant='primary'
              className='w-full'
              size='lg'
              onClick={onClick}
            >
              Get hearts(unlimited)
            </Button> */}
            <Button
              variant='primary'
              className='w-full'
              size='lg'
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
