'use client'
import React from 'react'
import { useParams } from 'next/navigation'
// Convex
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
// Components
import Icon from '~/components/icon'
//
import Title from './title'
import Banner from './banner'
import Menu from './menu'
import Publish from './publish'

interface Props {
  isCollapsed: boolean
  onResetWidth: () => void
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params: { docId: Id<'documents'> } = useParams()

  const document = useQuery(api.documents.getById, {
    id: params.docId as Id<'documents'>,
  })

  // Skeleton loading
  if (document == undefined) {
    return (
      <nav className='w-full flex items-center justify-between gap-x-4 px-4 py-2 h-12'>
        <Title.Skeleton />
        <div className='flex items-center gap-x-2 mr-2'>
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }

  if (document === null) return <div>Document not found</div>

  return (
    <>
      <nav className='w-full flex items-center gap-x-4 px-3 py-2 bg-white dark:bg-[#1e1e1e]'>
        {isCollapsed ? (
          <Icon
            className='text-muted-foreground'
            name='Menu'
            role='button'
            size={24}
            onClick={onResetWidth}
          />
        ) : (
          <div className='flex items-center justify-between w-full'>
            <Title initialData={document} />
            <div className='flex items-center gap-x-2'>
              <Publish initialData={document} />
              <Menu docId={document._id} />
            </div>
          </div>
        )}
      </nav>
      {document?.isArchived && <Banner docId={document._id} />}
    </>
  )
}

export default Navbar
