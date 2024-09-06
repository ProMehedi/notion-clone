'use client'
import React from 'react'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
// Convex
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import Icon from '~/components/icon'
import { Input } from '~/components/ui/input'
import Link from 'next/link'
import ConfirmModal from '~/components/modals/confirm-modal'

const TrashBox = () => {
  const [search, setSearch] = React.useState('')

  const router = useRouter()
  const params: { docId: Id<'documents'> } = useParams()
  const documents = useQuery(api.documents.getArchived)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const filterDocs = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  )

  const onRestore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Id<'documents'>
  ) => {
    e.stopPropagation()
    const promise = restore({ id })

    toast.promise(promise, {
      loading: 'Restoring document...',
      success: 'Document restored successfully',
      error: 'Failed to restore document',
    })
  }

  const onRemove = (id: Id<'documents'>) => {
    const promise = remove({ id })

    toast.promise(promise, {
      loading: 'Removing document...',
      success: 'Document removed successfully',
      error: 'Failed to remove document',
    })

    if (params.docId === id) router.push('/')
  }

  if (documents === undefined) return <div>Loading...</div>

  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <Icon name='Search' size={16} />
        <Input
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Search by page title...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
          No documents found.
        </p>
        {filterDocs &&
          filterDocs.length > 0 &&
          filterDocs.map((doc) => (
            <div
              key={doc._id}
              className='group text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between cursor-pointer'
              onClick={() => router.push(`/documents/${doc._id}`)}
            >
              <span className='truncate pl-2'>{doc?.title}</span>
              <div className='flex items-center'>
                <button
                  title='Restore'
                  type='button'
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  onClick={(e) => onRestore(e, doc._id)}
                >
                  <Icon
                    className='text-muted-foreground'
                    name='Undo'
                    size={16}
                  />
                </button>
                <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                  <button
                    className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    title='Delete'
                    type='button'
                  >
                    <Icon
                      className='text-muted-foreground'
                      name='ArchiveX'
                      size={16}
                    />
                  </button>
                </ConfirmModal>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TrashBox
