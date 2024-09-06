import React from 'react'
import { toast } from 'sonner'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Doc } from '~/convex/_generated/dataModel'
// Hooks
import useOrigin from '~/hooks/user-origin'
// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'

interface Props {
  initialData: Doc<'documents'>
}

const Publish = ({ initialData }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const origin = useOrigin()
  const update = useMutation(api.documents.update)
  const url = `${origin}/preview/${initialData._id}`

  const handlePublish = () => {
    setIsSubmitting(true)
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: 'Publishing the note...',
      success: 'Note successfully published',
      error: 'Failed to publish note',
    })
  }

  const handleUnpublish = () => {
    setIsSubmitting(true)
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false))

    toast.promise(promise, {
      loading: 'Unpublishing the note...',
      success: 'Note successfully unpublished',
      error: 'Failed to unpublish note',
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setIsCopied(true)

    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='outline'>
          {initialData?.isPublished ? 'Published' : 'Publish'}
          {initialData?.isPublished && (
            <Icon className='text-sky-500 ml-2' name='Globe' size={16} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
        {initialData?.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <Icon
                className='text-sky-500 animate-pulse'
                name='Globe'
                size={16}
              />
              <h4 className='text-sm font-medium text-sky-500'>
                This note is live on web.
              </h4>
            </div>
            <div className='flex items-center'>
              <input
                title='Copy URL'
                className='flex-1 p-2 border rounded-l-md text-xs h-8 bg-muted truncate'
                value={url}
                disabled
              />
              <Button
                className='h-8 rounded-l-none'
                size='sm'
                onClick={handleCopy}
                disabled={isCopied}
              >
                {isCopied ? (
                  <Icon name='Check' size={16} />
                ) : (
                  <Icon name='Copy' size={16} />
                )}
              </Button>
            </div>
            <Button
              className='w-full text-xs'
              size='sm'
              onClick={handleUnpublish}
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center space-y-2'>
            <Icon
              className='text-muted-foreground ml-2'
              name='Globe'
              size={24}
            />
            <div className='text-center'>
              <h4 className='text-sm font-medium'>Publish this note</h4>
              <p className='text-xs text-muted-foreground'>
                Share your work with others.
              </p>
            </div>
            <Button
              className='w-full text-xs'
              size='sm'
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default Publish
