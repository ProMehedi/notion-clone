'use client'
import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'
import ConfirmModal from '~/components/modals/confirm-modal'

interface Props {
  docId: Id<'documents'>
}

const Banner = ({ docId }: Props) => {
  const router = useRouter()
  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRemove = () => {
    const promise = remove({ id: docId })
    toast.promise(promise, {
      loading: 'Deleting document...',
      success: 'Document deleted successfully',
      error: 'Failed to delete document',
    })
    router.push('/documents')
  }

  const onRestore = () => {
    const promise = restore({ id: docId })
    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored successfully',
      error: 'Failed to restore document',
    })
  }

  return (
    <div className='w-full bg-rose-500 text-center gap-x-2 flex items-center justify-center text-sm p-2 text-white'>
      <p className=''>This page is in the Trash.</p>
      <Button
        size='sm'
        variant='outline'
        onClick={onRestore}
        className='text-green-300 border-green-300 bg-transparent hover:bg-green-300 hover:border-green-300 dark:hover:bg-green-300 dark:hover:text-green-950 dark:hover:border-green-300'
      >
        Restore Document
        <Icon className='ml-2' name='Undo' size={16} />
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size='sm'
          variant='outline'
          className='text-red-100 border-red-100 bg-transparent hover:bg-red-700 hover:text-white hover:border-red-700 dark:hover:bg-red-300 dark:hover:text-red-950 dark:hover:border-red-300'
        >
          Delete forever
          <Icon className='ml-2' name='Trash' size={16} />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default Banner
