import { ClerkProvider } from '@clerk/nextjs'
import { getLocaleOnServer } from '@/i18n/server'
import './styles/globals.css'
import './styles/markdown.scss'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ولثي مايند',
  icons: {
    icon: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
    shortcut: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
    apple: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
  },
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <ClerkProvider>
      <html lang={locale ?? 'en'} className="h-full">
        <body className="h-full">
          <div className="overflow-x-auto">
            <div className="w-screen h-screen min-w-[300px]">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default LocaleLayout
