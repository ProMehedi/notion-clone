import React from 'react'
import '@blocknote/core/fonts/inter.css'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import { useTheme } from 'next-themes'
import '@blocknote/mantine/style.css'

interface Props {
  onChange: (value: string) => void
  initialData: any
}

const Editor = ({ initialData, onChange }: Props) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const { resolvedTheme } = useTheme()
  const editor = useCreateBlockNote({
    initialContent: initialData ? JSON.parse(initialData) : undefined,
  })

  React.useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme === 'dark' ? 'dark' : 'light')
    }
  }, [resolvedTheme])

  return (
    <div>
      <BlockNoteView
        editable
        editor={editor}
        theme={theme}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2))
        }}
      />
    </div>
  )
}

export default Editor
