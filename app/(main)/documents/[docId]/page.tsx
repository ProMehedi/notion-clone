'use client'
import React from 'react'
// Convex
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
// Components
import Cover from '~/components/cover'
import Toolbar from '~/components/toolbar'
import { Skeleton } from '~/components/ui/skeleton'
import Editor from '~/components/editor'

interface Props {
  params: { docId: Id<'documents'> }
}

const SingleDoc = ({ params }: Props) => {
  const document = useQuery(api.documents.getById, { id: params.docId })
  const update = useMutation(api.documents.update)

  const onContentChange = (content: string) => {
    update({ id: params.docId, content })
  }

  // Skeleton loading
  if (document == undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
          <div className='space-y-4 pl-8 pt-4'>
            <Skeleton className='h-14 w-1/2' />
            <Skeleton className='h-6 w-1/3' />
            <Skeleton className='h-6 w-1/4' />
          </div>
        </div>
      </div>
    )
  }

  if (document === null) return <div>Document not found</div>

  return (
    <div className='pb-40'>
      <Cover url={document.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
        <Editor onChange={onContentChange} initialData={document.content} />
      </div>
    </div>
  )
}

export default SingleDoc
