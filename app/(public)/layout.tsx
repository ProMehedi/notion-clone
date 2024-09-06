'use client'

import React, { PropsWithChildren } from 'react'

const PreviewLayout = ({ children }: PropsWithChildren) => {
  React.useEffect(() => {
    document.body.style.height = 'unset'
  }, [])

  return <div className='h-full min-h-screen dark:bg-[#1f1f1f]'>{children}</div>
}

export default PreviewLayout
