import { ClerkProvider } from '@clerk/nextjs'
import { getLocaleOnServer } from '@/i18n/server'
import './styles/globals.css'
import './styles/markdown.scss'
import type { Metadata } from 'next'

// 🚀 إعدادات الـ SEO والصور المحدثة 🚀
export const metadata: Metadata = {
  title: 'Wealthy Mind',
  description: 'اكتشف إمكانياتك مع كوتش حمد',
  icons: {
    icon: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
    shortcut: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
    apple: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699a046320c035fe7bacda63.png',
  },
  openGraph: {
    title: 'Wealthy Mind',
    description: 'اكتشف إمكانياتك مع حمد',
    url: 'https://chat.wealthymindme.com',
    siteName: 'Wealthy Mind',
    images: [
      {
        url: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699d0bdc5dfd5064d29e7be9.png', // ← حط الرابط المباشر لصورة المشاركة (مقاس 1200x630)
        width: 1200,
        height: 630,
        alt: 'ولثي مايند - Wealthy Mind',
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ولثي مايند',
    description: 'اكتشف إمكانياتك مع كوتش حمد - مساعدك الذكي لتطوير الذات والأعمال',
    images: ['https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699d0bdc5dfd5064d29e7be9.png'], // ← حط نفس الرابط مرة ثانية هني
  },
}

// 🚀 كودك الأصلي وتصميم الموقع (ما مسكناه) 🚀
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
