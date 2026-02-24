import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
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
    // 🚀 السحر هني: ضفنا relative z-[99999] pointer-events-auto لرفع الهيدر بالكامل 🚀
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-transparent relative z-[99999] pointer-events-auto">
      
      {/* 1. الجانب الأيسر: زر القائمة الجانبية (للموبايل فقط) */}
      {isMobile ? (
        <div
          className='flex items-center justify-center h-8 w-8 cursor-pointer relative z-[99999]'
          onClick={() => onShowSideBar?.()}
        >
          <Bars3Icon className="h-5 w-5 text-gray-400" />
        </div>
      ) : (
        <div className="w-8"></div>
      )}

      {/* 2. المنتصف: الشعار واسم الموقع */}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className="text-sm text-[#ECECEC] font-bold">{title}</div>
      </div>

      {/* 3. الجانب الأيمن: زر محادثة جديدة + تسجيل الدخول */}
      {/* 🚀 رفعنا هالقسم عشان الزر ينضغط غصب 🚀 */}
      <div className='flex items-center space-x-3 relative z-[99999] pointer-events-auto'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {/* زر تسجيل الدخول */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="login-btn text-sm transition-colors cursor-pointer">
              Log in
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 cursor-pointer",
                // 🚀 هذي الحركة تجبر قائمة Clerk إنها تطلع فوق أي صندوق محادثة 🚀
                userButtonPopoverCard: "z-[99999]" 
              }
            }}
          />
        </SignedIn>
      </div>

    </div>
  )
}

export default React.memo(Header)
