'use client'
import React from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { useParams } from 'next/navigation'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
// Components
import { useCoverImage } from '~/hooks/use-cover-image'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'

interface Props {
  url?: string
  preview?: boolean
}

const Cover = ({ url, preview }: Props) => {
  const { onOpen } = useCoverImage()
  const params = useParams() as { docId: Id<'documents'> }
  const removeCoverImage = useMutation(api.documents.removeCoverImage)

  const onRemove = () => {
    const promise = removeCoverImage({ id: params.docId })

    toast.promise(promise, {
      loading: 'Removing cover image...',
      success: 'Cover image removed',
      error: 'Failed to remove cover image',
    })
  }

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt='Cover Image'
          objectFit='cover'
          className='object-cover'
        />
      )}

      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={onOpen}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <Icon className='mr-2' name='Image' size={14} />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <Icon className='mr-2' name='X' size={14} />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cover
