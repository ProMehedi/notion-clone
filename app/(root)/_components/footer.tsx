'use client'

import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { useScrollTop } from '~/hooks/use-scroll-top'
//
import Logo from './logo'

const Footer = () => {
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        'flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F] z-50',
        scrolled && 'border-t'
      )}
    >
      <Logo />
      <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
        <Button variant='link' size='sm'>
          Privacy Policy
        </Button>
        <Button variant='link' size='sm'>
          Terms & Conditions
        </Button>
      </div>
    </div>
  )
}

export default Footer
