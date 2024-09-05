'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
// Convex
import { Doc, Id } from '~/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import Item from './item'
import { cn } from '~/lib/utils'

interface Props {
  parenDocumentId?: Id<'documents'>
  level?: number
  data?: Doc<'documents'>[]
}

const DocumentList = ({ parenDocumentId, level = 0, data }: Props) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  const params = useParams()
  const router = useRouter()

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parenDocumentId,
  })

  const onExpand = (id: Id<'documents'>) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const onRedirect = (id: Id<'documents'>) => {
    router.push(`/documents/${id}`)
  }

  if (documents === undefined) return <Item.Skeleton level={level} />

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
            active={doc._id === params.id}
            level={level}
            expanded={expanded[doc._id]}
            onExpand={() => onExpand(doc._id)}
            onClick={() => onRedirect(doc._id)}
          />
          {expanded[doc._id] && (
            <DocumentList
              parenDocumentId={doc._id}
              level={level + 1}
              //   data={data}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default DocumentList
