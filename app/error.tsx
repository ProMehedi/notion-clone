'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Components
import Icon from '~/components/icon'
import { Button } from '~/components/ui/button'

const ErrorPage = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        className='dark:hidden'
        src='/error.png'
        width={300}
        height={300}
        alt='Error'
      />
      <Image
        className='hidden dark:block'
        src='/error-dark.png'
        width={300}
        height={300}
        alt='Error'
      />
      <h2 className='text-xl font-medium'>Something went wrong!</h2>
      <Button asChild>
        <Link href='/documents'>
          <Icon className='mr-2' name='Undo2' size={16} />
          Go back
        </Link>
      </Button>
    </div>
  )
}

export default ErrorPage
