import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
//
import ThemeProvider from '~/providers/theme-provider'
//
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion Clone',
  description: 'A Notion clone built with Next.js and Tailwind CSS',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en' suppressContentEditableWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          storageKey='theme'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
