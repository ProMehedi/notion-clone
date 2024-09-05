'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useConvexAuth } from 'convex/react'
import { SignInButton } from '@clerk/clerk-react'
//
import { Button } from '~/components/ui/button'

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
        Your Ideas, Documents, & Plans. Unified. Welcome to <u>Notion.</u>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Notion is the connected workspace <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className='animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-28 rounded mx-auto' />
      )}
      {!isLoading && !isAuthenticated && (
        <SignInButton mode='modal'>
          <Button size='sm'>
            Get Started Free
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </SignInButton>
      )}
      {!isLoading && isAuthenticated && (
        <Button size='sm' asChild>
          <Link href='/dashboard'>
            Enter Notion
            <ArrowRight className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      )}
    </div>
  )
}

export default Heading
