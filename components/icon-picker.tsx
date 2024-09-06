'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import EmojiPicker, { Theme } from 'emoji-picker-react'
// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

interface props {
  onChoose: (icon: string) => void
  children: React.ReactNode
  asChild?: boolean
}

const IconPicker = ({ onChoose, children, asChild }: props) => {
  const { resolvedTheme } = useTheme()
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  }

  const theme = themeMap[currentTheme]

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className='p-0 w-full border-none shadow-none'>
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChoose(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default IconPicker
