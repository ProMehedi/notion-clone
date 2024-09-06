'use client'
import React from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
// Convex
import { api } from '~/convex/_generated/api'
// Components
import Icon from '~/components/icon'
import { Button } from '~/components/ui/button'

const Dashboard = () => {
  const router = useRouter()
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' }).then((res) => {
      router.push(`/documents/${res}`)
    })
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
        className='dark:block hidden'
        src='/empty-dark.png'
        alt='Empty'
        width={300}
        height={300}
      />
      <p className='text-lg font-medium'>
        Welcome to {user?.firstName}'s Notion
      </p>
      <Button onClick={handleCreate}>
        <Icon name='CirclePlus' size={16} className='mr-2' />
        Create new note
      </Button>
    </div>
  )
}

export default Dashboard
