import React from 'react'
import { toast } from 'sonner'
import { icons } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
// Convex
import { useMutation } from 'convex/react'
import { Id } from '~/convex/_generated/dataModel'
import { api } from '~/convex/_generated/api'
// Components
import { cn } from '~/lib/utils'
import Icon from '~/components/icon'
import { Skeleton } from '~/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: Id<'documents'>
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onClick?: () => void
  onExpand?: () => void
  label: string
  icon: keyof typeof icons
}

const Item = ({ level = 0, ...props }: ItemProps) => {
  const create = useMutation(api.documents.create)
  const archive = useMutation(api.documents.archive)
  const router = useRouter()
  const { user } = useUser()

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    props.onExpand?.()
  }

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (!props.id) return

    const promise = create({
      title: 'Untitled',
      parentDocument: props.id,
    }).then((docId) => {
      if (!props.expanded) props.onExpand?.()
      router.push(`/documents/${docId}`)
    })

    toast.promise(promise, {
      loading: 'Creating new note...',
      success: 'Mew Note created successfully',
      error: 'Failed to create note',
    })
  }

  const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (!props.id) return

    const promise = archive({ id: props.id })
    toast.promise(promise, {
      loading: 'Archiving note...',
      success: 'Note moved to trash',
      error: 'Failed to archive note',
    })
  }

  return (
    <div
      role='button'
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        props.active && 'bg-primary/5 text-primary'
      )}
      onClick={props.onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
    >
      {!!props.id && (
        <div
          role='button'
          title='Expand'
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1 select-none'
          onClick={handleExpand}
        >
          <Icon
            className='shrink-0 h-[18px] text-muted-foreground'
            name={props.expanded ? 'ChevronDown' : 'ChevronRight'}
          />
        </div>
      )}
      {props.documentIcon ? (
        <div className='shrink-0 mr-2 texxt-[18px]'>{props.documentIcon}</div>
      ) : (
        <Icon
          className='shrink-0 h-[18px] mr-2 text-muted-foreground'
          name={props.icon}
        />
      )}
      <span className='truncate'>{props.label}</span>

      {props.isSearch && (
        <kbd className='pointer-events-none ml-auto h-5 select-none inline-flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[14px] font-semibold opacity-100 text-muted-foreground'>
          <span className='text-[10px] mt-[2px]'>⌘</span>K
        </kbd>
      )}

      {!!props.id && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div className='opacity-0 select-none group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                <Icon
                  className='shrink-0 h-4 w-4 text-muted-foreground'
                  name='Ellipsis'
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-60'
              align='start'
              side='right'
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Icon className='shrink-0 h-4 w-4 mr-2' name='Trash' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='text-xs text-muted-foreground p-2'>
                Last edited by: {user?.firstName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role='button'
            title='Create new note'
            onClick={onCreate}
            className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
          >
            <Icon
              className='shrink-0 h-4 w-4 text-muted-foreground'
              name='Plus'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Item

Item.Skeleton = ({ level }: { level?: number }) => {
  return (
    <div
      className={cn(
        'min-h-[27px] text-sm py-1 pr-3 w-full flex items-center text-muted-foreground font-medium animate-pulse'
      )}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
    >
      <Skeleton className='h-5 w-5 mr-2' />
      <Skeleton className='h-5 w-20' />
    </div>
  )
}
