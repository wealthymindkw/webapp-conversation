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
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-transparent">
      
      {/* 1. الجانب الأيسر */}
      {isMobile ? (
        <div
          className='flex items-center justify-center h-8 w-8 cursor-pointer'
          onClick={() => onShowSideBar?.()}
        >
          <Bars3Icon className="h-5 w-5 text-gray-400" />
        </div>
      ) : (
        <div className="w-8"></div>
      )}

      {/* 2. المنتصف */}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className="text-sm text-[#ECECEC] font-bold">{title}</div>
      </div>

      {/* 3. الجانب الأيمن: (الحل النهائي) */}
      {/* 🚀 سحبنا الزر من قفص الهيدر وخليناه يطفو فوق الشاشة بالكامل بخاصية fixed 🚀 */}
      <div className='fixed top-3 right-4 z-[99999999] flex items-center space-x-3'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
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
                userButtonAvatarBox: "w-8 h-8",
              }
            }}
          />
        </SignedIn>
      </div>

    </div>
  )
}

export default React.memo(Header)
