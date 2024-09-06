import React from 'react'
import TextareaAutoSize from 'react-textarea-autosize'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Doc } from '~/convex/_generated/dataModel'
// Hooks
import { useCoverImage } from '~/hooks/use-cover-image'
// Components
import IconPicker from '~/components/icon-picker'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'

interface Props {
  initialData: Doc<'documents'>
  preview?: boolean
}

const Toolbar = ({ initialData, preview }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(initialData?.title)

  const inputRef = React.useRef<React.ElementRef<'textarea'>>(null)
  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)
  const coverImage = useCoverImage()

  const enableInput = () => {
    if (preview) return
    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData?.title)
      inputRef.current?.focus()
    }, 0)
  }

  const onInput = (value: string) => {
    setValue(value)
    update({ id: initialData._id, title: value || 'Untitled' })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
      onInput(value)
    }
  }

  const onIconSelect = (icon: string) => {
    update({ id: initialData._id, icon })
  }

  const onIconRemove = () => {
    removeIcon({ id: initialData._id })
  }

  return (
    <div className='pl-[54px] group relative'>
      {!!initialData?.icon && !preview && (
        <div className='flex items-center gap-x-2 group/icon pt-6'>
          <IconPicker onChoose={onIconSelect}>
            <p className='text-6xl hover:opacity-75 transition'>
              {initialData?.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onIconRemove}
            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
            variant='outline'
            size='icon'
          >
            <Icon name='X' size={16} />
          </Button>
        </div>
      )}

      {!!initialData?.icon && preview && (
        <p className='text-6xl'>{initialData?.icon}</p>
      )}

      <div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
        {!initialData?.icon && !preview && (
          <IconPicker onChoose={onIconSelect} asChild>
            <Button
              className='text-muted-foreground text-xs'
              variant='outline'
              size='sm'
            >
              <Icon className='mr-2' name='Smile' size={16} />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData?.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <Icon className='mr-2' name='Image' size={16} />
            Add cover image
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutoSize
          className='text-5xl font-bold w-full bg-transparent border-none break-words focus:outline-none resize-none text-[#3f3f3f] dark:text-[#cfcfcf]'
          ref={inputRef}
          onBlur={() => setIsEditing(false)}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <h1
          onClick={enableInput}
          className='pb-[11.5px] text-5xl font-bold w-full bg-transparent border-none break-words focus:outline-none select-none text-[#3f3f3f] dark:text-[#cfcfcf]'
        >
          {initialData?.title}
        </h1>
      )}
    </div>
  )
}

export default Toolbar
