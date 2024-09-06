'use client'
import Link from 'next/link'
import { useConvexAuth } from 'convex/react'
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'

import { cn } from '~/lib/utils'
import { useScrollTop } from '~/hooks/use-scroll-top'
import { Button } from '~/components/ui/button'
import ModeToggle from '~/components/mode-toggle'
//
import Logo from './logo'

const Navbar = () => {
  const scrolled = useScrollTop()
  const { user } = useUser()
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />

      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        {isLoading && (
          <>
            <div className='animate-pulse bg-gray-300 dark:bg-gray-700 h-4 w-14 rounded' />
            <div className='animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-32 rounded' />
          </>
        )}

        {!isLoading && !isAuthenticated && (
          <>
            <SignInButton mode='modal'>
              <Button variant='link'>Sign In</Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Get Started free</Button>
            </SignInButton>
          </>
        )}

        {!isLoading && isAuthenticated && (
          <>
            <Button size='sm' asChild>
              <Link href='/documents'>{user?.firstName}&apos;s Documents</Link>
            </Button>
            <UserButton afterSwitchSessionUrl='/' />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
