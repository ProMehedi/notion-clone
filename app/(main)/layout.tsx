'use client'
import { PropsWithChildren } from 'react'
import { Loader } from 'lucide-react'
import { redirect } from 'next/navigation'
// Convex
import { useConvexAuth } from 'convex/react'
// Components
import SearchCommand from '~/components/search-command'
import Navigation from './_components/navigation'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='mr-2 h-8 w-8 animate-spin' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className='h-full flex dark:bg-[#f1f1f1]'>
      <Navigation />
      <main className='flex-1 h-full overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
