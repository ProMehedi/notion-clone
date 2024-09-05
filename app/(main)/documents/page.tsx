'use client'
import React from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
// Convex
import { api } from '~/convex/_generated/api'
// Components
import { Button } from '~/components/ui/button'
import { toast } from 'sonner'

const Dashboard = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' })
    toast.promise(promise, {
      loading: 'Creating note...',
      success: 'Note created successfully',
      error: 'Failed to create note',
    })
  }

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
      <Button onClick={handleCreate}>
        <PlusCircle className='h-5 w-5 mr-2' />
        Create your first note
      </Button>
    </div>
  )
}

export default Dashboard
