'use client'
import { SignOutButton, useUser } from '@clerk/clerk-react'
import { ChevronsLeftRight } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

const UserItem = () => {
  const { user } = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          title={user?.fullName || ''}
          className='flex items-center text-sm p-3 w-full hover:bg-primary/5'
          role='button'
        >
          <div className='gap-x-2 flex items-center max-w-[160px]'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className='text-start font-medium line-clamp-1'>
              {user?.firstName || 'Unknown'}&apos; Notion
            </span>
          </div>

          <ChevronsLeftRight className='rotate-90 ml-2 text-muted-foreground h-4 w-4' />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-80'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='flex flex-col space-y-4 p-2'>
          <p className='text-xs font-medium leading-none text-muted-foreground'>
            {user?.emailAddresses[0].emailAddress}
          </p>

          <div className='flex items-center gap-x-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className='space-y-1'>
              <p className='text-sm line-clamp-1'>
                {user?.fullName || 'Unknown'}&apos;s Notion
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='p-0'>
          <SignOutButton>
            <Button className='w-full' variant='link'>
              Sign out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserItem
