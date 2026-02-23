import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
// 🚀 استيراد أدوات Clerk لتسجيل الدخول 🚀
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-transparent">
      
      {/* 1. الجانب الأيسر: زر القائمة الجانبية (للموبايل فقط) */}
      {isMobile ? (
        <div
          className='flex items-center justify-center h-8 w-8 cursor-pointer'
          onClick={() => onShowSideBar?.()}
        >
          <Bars3Icon className="h-5 w-5 text-gray-400" />
        </div>
      ) : (
        <div className="w-8"></div> /* مساحة وهمية عشان الشعار يظل بالنص */
      )}

      {/* 2. المنتصف: الشعار واسم الموقع */}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className="text-sm text-[#ECECEC] font-bold">{title}</div>
      </div>

      {/* 3. الجانب الأيمن: زر محادثة جديدة + تسجيل الدخول */}
      <div className='flex items-center space-x-3'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {/* 🚀 يظهر إذا المستخدم مو مسجل دخول (زر أبيض فخم) 🚀 */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium text-[#212121] bg-[#ECECEC] hover:bg-white px-4 py-1.5 rounded-full transition-colors">
              Log in
            </button>
          </SignInButton>
        </SignedOut>

        {/* 🚀 يظهر إذا المستخدم مسجل دخول (الصورة الشخصية الدائرية) 🚀 */}
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8" /* حجم الصورة مناسب للهيدر */
              }
            }}
          />
        </SignedIn>
      </div>

    </div>
  )
}

export default React.memo(Header)
