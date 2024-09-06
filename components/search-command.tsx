'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
// Convex
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
// Hooks
import { useSearch } from '~/hooks/use-search'
// Components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import Icon from '~/components/icon'

const SearchCommand = () => {
  const [isMounted, setIsMounted] = React.useState(false)

  const { user } = useUser()
  const router = useRouter()
  const documents = useQuery(api.documents.getSearch)

  const { toggle, isOpen, onClose, onOpen } = useSearch()

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpen])

  const handleSelect = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  if (!isMounted) return null

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.firstName}'s Notion...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Documents'>
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id} - ${doc.title}`}
              title={doc.title}
              onSelect={() => handleSelect(doc._id)}
            >
              {doc.icon ? (
                <p className='mr-2 text-[18px]'>{doc.icon}</p>
              ) : (
                <Icon className='mr-2' name='FileText' size={18} />
              )}
              <span className=''>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default SearchCommand
