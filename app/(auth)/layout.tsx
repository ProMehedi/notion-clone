import { PropsWithChildren } from 'react'

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className='bg-red-500 h-full'>{children}</div>
    </>
  )
}

export default AuthLayout
