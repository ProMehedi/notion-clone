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

interface Props {
  isCollapsed: boolean
  onResetWidth: () => void
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams()

  const document = useQuery(api.documents.getById, {
    docId: params.docId as Id<'documents'>,
  })

  // Skeleton loading
  if (document === undefined) {
    return (
      <nav className='w-full flex items-center gap-x-4 px-3 py-2'>
        <Title.Skeleton />
      </nav>
    )
  }

  if (document === null) return <div>Document not found</div>

  return (
    <>
      <nav className='w-full flex items-center gap-x-4 px-3 py-2'>
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
          </div>
        )}
      </nav>
      {document?.isArchived && <Banner docId={document._id} />}
    </>
  )
}

export default Navbar
