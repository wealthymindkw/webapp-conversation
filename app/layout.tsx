import { ClerkProvider } from '@clerk/nextjs'
import { getLocaleOnServer } from '@/i18n/server'
import './styles/globals.css'
import './styles/markdown.scss'
import type { Metadata } from 'next'

// 🚀 إعدادات الـ SEO مع إضافة الـ metadataBase 🚀
export const metadata: Metadata = {
  metadataBase: new URL('https://chat.wealthymindme.com'),
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
        url: 'https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699d0bdc5dfd5064d29e7be9.png',
        width: 1200,
        height: 630,
        alt: 'Wealthy Mind',
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealthy Mind',
    description: 'اكتشف إمكانياتك مع كوتش حمد',
    images: ['https://assets.cdn.filesafe.space/rhWELETMkXWiHgXmcNv0/media/699d0bdc5dfd5064d29e7be9.png'],
  },
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    // 🚀 السحر هني: برمجنا Clerk عشان يصير لونه فخم ويطابق موقعك 🚀
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#ECECEC', // لون الأزرار الأساسية (صار فاتح بدال البنفسجي)
          colorBackground: '#2F2F2F', // خلفية المربع رمادي غامق نفس رسائل البوت
          colorText: '#ECECEC', // لون النصوص فاتح
          colorInputBackground: '#212121', // لون خانة الكتابة من داخل أغمق بشوي
          colorInputText: '#ECECEC', // لون الخط داخل الخانة
        },
        elements: {
          formButtonPrimary: 'text-[#212121] bg-[#ECECEC] hover:bg-white font-bold transition-colors', // تعديل نص الزر الرئيسي
          card: 'shadow-2xl border border-gray-700 rounded-2xl', // إطار فخم للمربع
          footerActionLink: 'text-[#ECECEC] font-bold hover:opacity-80', // رابط تسجيل الدخول اللي تحت
          headerTitle: 'text-2xl font-bold', // عنوان الصفحة
          headerSubtitle: 'text-gray-400', // النص الفرعي
        }
      }}
    >
      <html lang={locale ?? 'en'} className="h-full">
        <body className="h-full">
          {/* تم إزالة القفص (overflow-x-auto) عشان القائمة تقدر تفتح براحتها */}
          <div className="w-full h-full min-w-[300px]">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default LocaleLayout
