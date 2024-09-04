'use client'
import { ArrowRight } from 'lucide-react'
//
import { Button } from '~/components/ui/button'

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
        Your Ideas, Documents, & Plans. Unified. Welcome to <u>Notion.</u>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Notion is the connected workspace <br />
        better, faster work happens.
      </h3>
      <Button>
        Enter Notion
        <ArrowRight className='w-4 h-4 ml-2' />
      </Button>
    </div>
  )
}

export default Heading
