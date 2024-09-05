import React from 'react'
import { icons } from 'lucide-react'
// Convex
import { Id } from '~/convex/_generated/dataModel'
// Components
import { cn } from '~/lib/utils'
import Icon from '~/components/icon'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: Id<'documents'>
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onClick: () => void
  label: string
  icon: keyof typeof icons
}

const Item = ({ level = 0, ...props }: ItemProps) => {
  return (
    <div
      role='button'
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        props.active && 'bg-primary/5 text-primary'
      )}
      onClick={props.onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
    >
      {!!props.id && (
        <div
          role='button'
          title='Expand'
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
          onClick={() => {}}
        >
          <Icon
            className='shrink-0 h-[18px] mr-2 text-muted-foreground'
            name={props.expanded ? 'ChevronDown' : 'ChevronRight'}
          />
        </div>
      )}
      {props.documentIcon ? (
        <div className='shrink-0 mr-2 texxt-[18px]'>{props.documentIcon}</div>
      ) : (
        <Icon
          className='shrink-0 h-[18px] mr-2 text-muted-foreground'
          name={props.icon}
        />
      )}
      <span className='truncate'>{props.label}</span>

      {props.isSearch && (
        <kbd className='pointer-events-none ml-auto h-5 select-none inline-flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[14px] font-semibold opacity-100 text-muted-foreground'>
          <span className='text-[10px] mt-[2px]'>⌘</span>K
        </kbd>
      )}
    </div>
  )
}

export default Item
