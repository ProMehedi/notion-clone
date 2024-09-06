'use client'
import Image from 'next/image'
import React from 'react'
//
import { cn } from '~/lib/utils'
import { Button } from './ui/button'
import Icon from './icon'
import { useCoverImage } from '~/hooks/use-cover-image'

interface Props {
  url?: string
  preview?: boolean
}

const Cover = ({ url, preview }: Props) => {
  const { onOpen } = useCoverImage()

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
            // onClick={coverImage.onOpen}
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
