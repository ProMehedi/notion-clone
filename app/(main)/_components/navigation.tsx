'use client'
import React from 'react'
import { toast } from 'sonner'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
import { ChevronsLeft, MenuIcon } from 'lucide-react'
// Convex
import { useQuery, useMutation } from 'convex/react'
import { api } from '~/convex/_generated/api'
//
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
//
import UserItem from './user-item'
import Item from './item'
import DocumentList from './document-list'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import TrashBox from './trash-box'
import { useSearch } from '~/hooks/use-search'

const Navigation = () => {
  const path = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const documents = useQuery(api.documents.getAll)
  const create = useMutation(api.documents.create)
  const openSearchDialog = useSearch((state) => state.onOpen)

  const [isResetting, setIsResetting] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile)

  const isResizingRef = React.useRef(false)
  const sidebarRef = React.useRef<React.ElementRef<'aside'>>(null)
  const navbarRef = React.useRef<React.ElementRef<'div'>>(null)

  React.useEffect(() => {
    if (isMobile) {
      collanpseSidebar()
    } else {
      resetWidth()
    }
  }, [isMobile])

  React.useEffect(() => {
    if (isMobile) collanpseSidebar()
  }, [path])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = e.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
    }

    if (navbarRef.current) {
      navbarRef.current.style.left = `${newWidth}px`
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    isResizingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
    }

    if (navbarRef.current) {
      navbarRef.current.style.left = isMobile ? '100%' : '240px'
      navbarRef.current.style.width = isMobile ? '100%' : 'calc(100% - 240px)'
    }

    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const collanpseSidebar = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.left = '0'
      navbarRef.current.style.width = '100%'

      setTimeout(() => {
        setIsResetting(false)
      }, 300)
    }
  }

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' })
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New Note created successfully',
      error: 'Failed to create new note',
    })
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-30',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <Button
          onClick={collanpseSidebar}
          className={cn(
            'absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:bg-neutral-300 dark:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
          variant='ghost'
          size='icon'
        >
          <ChevronsLeft className='h-6 w-6' />
        </Button>

        <div className=''>
          <UserItem />
          <Item
            isSearch
            label='Search'
            icon='Search'
            onClick={openSearchDialog}
          />
          <Item label='Settings' icon='Settings' onClick={() => {}} />
          <Item label='New page' icon='CirclePlus' onClick={handleCreate} />
        </div>

        <div className='mt-4'>
          <DocumentList />
          <Popover>
            <PopoverTrigger className='w-full mt-4'>
              <Item label='Trash' icon='Trash' />
            </PopoverTrigger>
            <PopoverContent
              className='p-0 w-72'
              side={isMobile ? 'bottom' : 'right'}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onDoubleClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-50 left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role='button'
              className='h-6 w-6 text-muted-foreground'
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Navigation
