'use client'
import React from 'react'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
// Convex
import { Doc, Id } from '~/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
// Components
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import Icon from '~/components/icon'
//
import Item from './item'

interface Props {
  parenDocumentId?: Id<'documents'>
  level?: number
  data?: Doc<'documents'>[]
}

const DocumentList = ({ parenDocumentId, level = 0, data }: Props) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})
  const [notFound, setNotFound] = React.useState(false)

  const params: { docId: Id<'documents'> } = useParams()
  const router = useRouter()

  const create = useMutation(api.documents.create)
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parenDocumentId,
  })

  const onExpand = (id: Id<'documents'>) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const onRedirect = (id: Id<'documents'>) => {
    router.push(`/documents/${id}`)
  }

  React.useEffect(() => {
    if (documents === undefined) return
    if (documents && documents.length === 0 && parenDocumentId === undefined) {
      setNotFound(true)
    }
    if (documents && documents.length !== 0) {
      setNotFound(false)
    }
  }, [documents, parenDocumentId])

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' }).then((res) => {
      router.push(`/documents/${res}`)
    })
    toast.promise(promise, {
      loading: 'Creating new note...',
      success: 'new Note created successfully',
      error: 'Failed to create note',
    })
  }

  if (documents === undefined) {
    if (parenDocumentId === undefined) {
      return (
        <>
          <Item.Skeleton level={level} />
          <Item.Skeleton level={level} />
          <Item.Skeleton level={level} />
        </>
      )
    } else {
      return <Item.Skeleton level={level} />
    }
  }

  if (notFound) {
    return (
      <div className='flex flex-col space-y-3 items-center p-3'>
        <p className='text-sm font-medium text-muted-foreground/80 text-center'>
          You don&apos;t have any documents
          <br />
          Let&apos;s create one!
        </p>
        <Button className='ml-2' size='sm' onClick={handleCreate}>
          <Icon name='CirclePlus' className='h-4 mr-2' />
          Create
        </Button>
      </div>
    )
  }

  return (
    <>
      <p
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>

      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            icon='FileText'
            documentIcon={doc.icon}
            active={doc._id === params.docId}
            level={level}
            expanded={expanded[doc._id]}
            onExpand={() => onExpand(doc._id)}
            onClick={() => onRedirect(doc._id)}
          />
          {expanded[doc._id] && (
            <DocumentList parenDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}

      {parenDocumentId === undefined && (
        <Item label='Add a page' icon='Plus' onClick={handleCreate} />
      )}
    </>
  )
}

export default DocumentList
