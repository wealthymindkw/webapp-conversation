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
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-transparent relative z-[99999]">
      
      {/* 1. الجانب الأيسر (حجزنا له مساحة ثابتة عشان التوازن) */}
      <div className="flex items-center w-24">
        {isMobile && (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer relative z-[2147483647]'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* 2. المنتصف (قفلناه بالنص مستحيل يتحرك يمين ويغطي الزر) */}
      <div className='flex items-center justify-center space-x-2 flex-1 pointer-events-none'>
        <AppIcon size="small" />
        <div className="text-sm text-[#ECECEC] font-bold">{title}</div>
      </div>

      {/* 3. الجانب الأيمن (زر Clerk) */}
      {/* 🚀 عطيناه أعلى قوة بالمتصفح وحميناه من أي تداخل 🚀 */}
      <div className='flex items-center justify-end space-x-3 w-24 relative z-[2147483647] pointer-events-auto'>
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
                userButtonAvatarBox: "w-8 h-8 cursor-pointer",
                userButtonPopoverCard: "z-[2147483647]"
              }
            }}
          />
        </SignedIn>
      </div>

    </div>
  )
}

export default React.memo(Header)
