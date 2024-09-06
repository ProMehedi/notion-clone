'use client'
import React from 'react'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Doc } from '~/convex/_generated/dataModel'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

interface Props {
  initialData: Doc<'documents'>
}

const Title = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [title, setTitle] = React.useState(initialData?.title || 'Untitled')

  const inputRef = React.useRef<HTMLInputElement>(null)
  const update = useMutation(api.documents.update)

  const enableInput = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length)
    }, 0)
  }

  const onChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    update({ id: initialData._id, title: e.target.value || 'Untitled' })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData?.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className='h-7 m-0 p-1 focus-visible:ring-transparent text-sm'
          value={title}
          onClick={enableInput}
          onChange={onChage}
          onBlur={() => setIsEditing(false)}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Button
          variant='ghost'
          size='sm'
          className='font-normal h-7 text-sm p-1 m-0 hover:bg-transparent'
          onClick={enableInput}
        >
          <span className='truncate'>{initialData?.title}</span>
        </Button>
      )}
    </div>
  )
}

const Sk = () => <Skeleton className='h-4 w-16 rounded-sm' />
Sk.displayName = 'Title.Skeleton'
Title.Skeleton = Sk

export default Title
