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
    <div className="shrink-0 flex items-center justify-between h-14 px-3 pc:px-4 bg-transparent w-full relative z-50">
      
      {/* الجانب الأيسر: زر القائمة صغرنا مساحته بالموبايل */}
      <div className="flex items-center justify-start w-12 pc:w-24 shrink-0">
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onShowSideBar?.()}>
            <Bars3Icon className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
          </div>
        )}
      </div>

      {/* المنتصف: العنوان أخذ مساحته وصار مرتب */}
      <div className='flex items-center justify-center space-x-1.5 pc:space-x-2 flex-1 overflow-hidden'>
        <AppIcon size="small" />
        <div className="text-xs pc:text-sm text-[#ECECEC] font-bold truncate">{title}</div>
        <span className="text-[9px] pc:text-[10px] font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-1.5 py-0.5 rounded-full shrink-0">
          BETA
        </span>
      </div>

      {/* الجانب الأيمن: زر المحادثة الجديدة */}
      <div className='flex items-center justify-end space-x-2 pc:space-x-3 w-auto pc:w-24 shrink-0'>
        {isMobile && (
          <div className='flex items-center justify-center h-8 w-8 cursor-pointer' onClick={() => onCreateNewChat?.()} >
            <PencilSquareIcon className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
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
