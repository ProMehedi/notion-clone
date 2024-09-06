'use client'
import React from 'react'
import CoverImageModal from '~/components/modals/cover-image-modal'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CoverImageModal />
    </>
  )
}

export default ModalProvider
