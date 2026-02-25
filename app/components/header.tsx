import type { FC } from 'react'
import React from 'react'
import { Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<IHeaderProps> = ({ title, isMobile, onShowSideBar, onCreateNewChat }) => {
  return (
    // 🚀 z-50 عشان يظل فوق المحادثة والزر ينضغط 🚀
    <div className="shrink-0 flex items-center justify-between h-14 px-4 bg-transparent w-full relative z-50">
      
      <div className="flex items-center justify-start w-24">
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onShowSideBar?.()}>
            <Bars3Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* 🚀 التعديل هني: ضفنا علامة BETA برتقالية فخمة يم العنوان 🚀 */}
      <div className='flex items-center justify-center space-x-2 flex-1'>
        <AppIcon size="small" />
        <div className="text-sm text-[#ECECEC] font-bold">{title}</div>
        <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded-full">
          BETA
        </span>
      </div>

      <div className='flex items-center justify-end space-x-3 w-24'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <SignedOut>
          <SignInButton mode="modal">
            <button className="login-btn text-sm transition-colors cursor-pointer">Log in</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default React.memo(Header)
