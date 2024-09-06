import React from 'react'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
// Convex
import { useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { Skeleton } from '~/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'

interface Props {
  docId: Id<'documents'>
}

const Menu = ({ docId }: Props) => {
  const router = useRouter()
  const { user } = useUser()
  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({ id: docId })
    toast.promise(promise, {
      loading: 'Archiving document...',
      success: 'Document archived successfully',
      error: 'Failed to archive document',
    })
    router.push('/documents')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm'>
          <Icon name='Ellipsis' size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        align='end'
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Icon name='Trash' size={16} />
          <span className='ml-2'>Delete note</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-muted-foreground p-2 text-xs'>
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = () => <Skeleton className='w-4 h-2' />

export default Menu
