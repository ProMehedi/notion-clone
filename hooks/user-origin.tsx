import React from 'react'

const useOrigin = () => {
  const [mounted, setMounted] = React.useState(false)

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return origin
}

export default useOrigin
