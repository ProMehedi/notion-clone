'use client'
import { useUser } from '@clerk/clerk-react'
import { Frown, Plus, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '~/components/ui/button'

const Dashboard = () => {
  const { user } = useUser()
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        className='dark:hidden'
        src='/empty.png'
        alt='Empty'
        width={300}
        height={300}
      />
      <Image
        className='hidden dark:block:'
        src='/empty-dark.png'
        alt='Empty'
        width={300}
        height={300}
      />
      <p className='text-lg font-medium'>
        Welcome to {user?.firstName}'s Notion
      </p>
      <Button onClick={() => alert('Hello!')}>
        <PlusCircle className='h-5 w-5 mr-2' />
        Create your first note
      </Button>
    </div>
  )
}

export default Dashboard
