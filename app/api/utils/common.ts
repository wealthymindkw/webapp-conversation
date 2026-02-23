import type { NextRequest } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO } from '@/config'
// 🚀 1. استيراد الأداة الرسمية من Clerk 🚀
import { getAuth } from '@clerk/nextjs/server'

const userPrefix = `user_${APP_ID}:`

export const getInfo = (request: NextRequest) => {
  // 🚀 2. سحب رقم المستخدم (ID) الرسمي الخاص فيه من Clerk 🚀
  const { userId } = getAuth(request)

  // 🚀 3. إذا مسجل دخول نستخدم الـ ID ماله، وإذا زائر نستخدم الكوكي العادي 🚀
  const sessionId = userId || request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
