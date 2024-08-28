'use client'

import { useHeartsModal } from '@/store/use-hearts-modal'
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

export const HeartsModal = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsClient(true), [])
  if (!isClient) return null

  const onClick = () => {
    close()
    router.push('/store')
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center w-full justify-center mb-5'>
            <Image src='/mascot_bad.svg' alt='Mascot' height={80} width={80} />
          </div>
          <DialogTitle className='text-center font-bold text-2xl'>
            You ran out of heart!
          </DialogTitle>
          <DialogDescription className='text-center text-base'>
            Get pro for unlimited hearts or purchase them in the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mb-4'>
          <div className='flex flex-col gap-y-4 w-full'>
            <Button
              variant='primary'
              className='w-full'
              size='lg'
              onClick={onClick}
            >
              Get hearts(unlimited)
            </Button>
            <Button
              variant='primaryOutline'
              className='w-full'
              size='lg'
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
