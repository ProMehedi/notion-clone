import { PropsWithChildren } from 'react'
import Navbar from './_components/navbar'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='h-full pt-40'>{children}</main>
    </div>
  )
}

export default Layout
